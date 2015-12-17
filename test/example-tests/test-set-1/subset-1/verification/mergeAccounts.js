// Possible useful example, but way too much to make work for now.

/*function runTests( should )
{	
	var _ = require( 'lodash' ); // The hell is Mocha doing?
	var AccessToken;
	var Channel;
	var ChannelMember;
	var Contact;
	var Member;
	var SMS;
	var Verification;

	var accountTransferList;
	var config = {};
	var testData = {}; // Stored as { model: { instance_storeAs: { ... } } }

	function requireModels ( done )
	{
		AccessToken = loopback.getModel( 'AccessToken' );
		Channel = loopback.getModel( 'channel' );
		ChannelMember = loopback.getModel( 'channelMember' );
		Contact = loopback.getModel( 'contact' );
		Member = loopback.getModel( 'member' );
		SMS = loopback.getModel( 'sms' );
		Verification = loopback.getModel( 'verification' );

		accountTransferList = Member.app.dataSources.accountTransferList.settings;
		done();		
	}
	function setConfigToModel ( modelName, done )
	{
		config = _.find( accountTransferList, function ( val ) { return val.modelName === modelName; } ) || null;
		done();
	}
	function generateTestData( configEntry, done )
	{
		var _ = require( 'lodash' );
		should.exist( configEntry );
		should.exist( configEntry.model );
		should.exist( configEntry.properties );
		should.exist( configEntry.storeAs );
		var model;
		try {
			model = loopback.getModel( configEntry.model );
		} catch (e) {
			return done(e);
		}

		var createFn;
		if ( configEntry.model === 'member' ) {
			createFn = model.newMember;
		} else {
			createFn = model.create;
		}
		
		// Trying to call model.create with its context makes it very unhappy
		createFn.call( model, configEntry.properties, function ( err, instance )
		{
			should.not.exist( err );
			should.exist( instance );
			var path = configEntry.model + '.' + configEntry.storeAs;
			_.set( testData, path, instance );

			var relatedModelName = _.get( configEntry, 'storeRelated.relatedModel', null );
			var storeAs = _.get( configEntry, 'storeRelated.storeAs', null );
			if ( relatedModelName && storeAs )
			{
				var relatedModel;
				try {
					relatedModel = loopback.getModel( relatedModelName );
				} catch (e) {
					return done(e);
				}
				relatedModel.findOne( configEntry.storeRelated.searchObj, function ( err, relatedInstance )
				{
					should.not.exist( err );
					should.exist( relatedInstance );
					path = relatedModelName + '.' + storeAs;
					_.set( testData, path, relatedInstance );
					done();
				});
			}
			else
			{
				done();
			}
		});
	}
	function setupMembers ( done )
	{
		var setupMembersConfig = [
			{ model: 'member', storeAs: 'claimant', properties: { contact: '11111111111', password: 'aPassword' }, storeRelated: { relatedModel: 'contact', storeAs: 'contact1a', searchObj: { where: { contact: '11111111111' } } } }, // contact1a
			{ model: 'member', storeAs: 'victim', properties: { contact: '33333333333', password: 'anotherPassword' }, storeRelated: { relatedModel: 'contact', storeAs: 'contact2a', searchObj: { where: { contact: '33333333333' } } } }, // contact2a
			{ model: 'member', storeAs: 'otherPerson', properties: { contact: 'R2D2FFFFFFFFFFFF@gmail.com', password: 'anotherPassword' }, storeRelated: { relatedModel: 'contact', storeAs: 'otherPerson', searchObj: { where: { contact: 'r2d2ffffffffffff@gmail.com' } } } } // contact2a
		];		
		async.eachSeries( setupMembersConfig, generateTestData, done );
	}
	function setupChannels( done )
	{
		var setupChannelsConfig = [
			{ model: 'channel', storeAs: 'chan1', properties: { topic: 'chan1', name: 'chan1' } },
			{ model: 'channel', storeAs: 'chan2', properties: { topic: 'chan2', name: 'chan2' } },
			{ model: 'channel', storeAs: 'chan3', properties: { topic: 'chan3', name: 'chan3' } }
		];
		async.eachSeries( setupChannelsConfig, generateTestData, done );
	}
	function setupBasic ( modelName, done )
	{
		Member.app.dataSources.db.automigrate( function () 
		{
			async.waterfall( [setupMembers], function ( err )
			{
				should.not.exist( err );
				// Split configs so we have access to testData.member in the second.
				var setupBasicConfig = [ 
					{ model: 'contact', storeAs: 'contact1b', properties: { contact: '22222222222', memberId: testData.member.claimant.id } },
					{ model: 'contact', storeAs: 'contact2b', properties: { contact: '44444444444', memberId: testData.member.victim.id } },
					{ model: 'contact', storeAs: 'dup1', properties: { contact: 'duplicate@udu.co', memberId: testData.member.claimant.id } },
					{ model: 'contact', storeAs: 'dup2', properties: { contact: 'duplicate@udu.co', memberId: testData.member.victim.id } },
					{ model: 'verification', storeAs: 'verification', properties: { code: Member.memberHelpers.getRandomXCharString(), memberId: testData.member.claimant.id, victimId: testData.member.victim.id } }
				];				
				async.eachSeries( setupBasicConfig, generateTestData, done );
			});
		});											
	}
	function setupMultipleUniqueProperties ( done ) // SMS
	{
		var numbers = {
			num1: '19193556102',
			num2: '19193556139',
			num3: '19193556124',
			num4: '19193556090'
		};
		Member.app.dataSources.db.automigrate( function () 
		{
			async.waterfall( [setupMembers, setupChannels], function ( err )
			{
				should.not.exist( err );
				// Split configs so we have access to testData.member in the second.
				var setupBasicConfig = [ 
					{ model: 'sms', storeAs: 'num1a', properties: { number: numbers.num1, channelId: testData.channel.chan1.id, memberId: testData.member.claimant.id } },
					{ model: 'sms', storeAs: 'num1b', properties: { number: numbers.num1, channelId: testData.channel.chan2.id, memberId: testData.member.victim.id } },
					{ model: 'sms', storeAs: 'num2', properties: { number: numbers.num2, channelId: testData.channel.chan2.id, memberId: testData.member.claimant.id } },
					{ model: 'sms', storeAs: 'num3', properties: { number: numbers.num3, channelId: testData.channel.chan2.id, memberId: testData.member.victim.id } },
					{ model: 'sms', storeAs: 'num4', properties: { number: numbers.num4, channelId: testData.channel.chan3.id, memberId: testData.member.victim.id } },
					{ model: 'verification', storeAs: 'verification', properties: { code: Member.memberHelpers.getRandomXCharString(), memberId: testData.member.claimant.id, victimId: testData.member.victim.id } }
				];				
				async.eachSeries( setupBasicConfig, generateTestData, done );
			});
		});	
	}

	function setupForeignKey ( done ) // AccessToken
	{
		Member.app.dataSources.db.automigrate( function () 
		{
			async.waterfall( [setupMembers], function ( err )
			{
				should.not.exist(err);

				var setupForeignKeyConfig = [
					{ model: 'AccessToken', storeAs: 'at1', properties: { userId: testData.member.claimant.id } },
					{ model: 'AccessToken', storeAs: 'at2', properties: { userId: testData.member.victim.id } },
					{ model: 'AccessToken', storeAs: 'at3', properties: { userId: testData.member.otherPerson.id } },
					{ model: 'verification', storeAs: 'verification', properties: { code: Member.memberHelpers.getRandomXCharString(), memberId: testData.member.claimant.id, victimId: testData.member.victim.id } }
				];
				async.eachSeries( setupForeignKeyConfig, generateTestData, done );
			});
		});	
	}

	function setupRequiredPropertyForDuplicates ( done ) // Verification
	{
		Member.app.dataSources.db.automigrate( function () 
		{
			async.waterfall( [setupMembers], function ( err )
			{
				should.not.exist(err);

				var setupRequiredPropertyConfig = [
					{ model: 'verification', storeAs: 'oldVerification', properties: { code: Member.memberHelpers.getRandomXCharString(), memberId: testData.member.victim.id, victimId: testData.member.victim.id, verifyAddress: '33333333333', dateExpended: new Date() } },
					{ model: 'verification', storeAs: 'verification', properties: { code: Member.memberHelpers.getRandomXCharString(), memberId: testData.member.claimant.id, victimId: testData.member.victim.id, verifyAddress: '33333333333' } }
				];
				async.eachSeries( setupRequiredPropertyConfig, generateTestData, done );
			});
		});	
	}

	function updateVictimAndClaimant ( contact, done )
	{
		if ( typeof contact === 'function' ) {
			done = contact;
		}
		var searchObj = {
			where: {
				id: _.get( testData, 'member.claimant.id', 'failedToFindId' )
			},
			include: ['contacts', 'devices', 'verifications']
		}
		Member.findOne( searchObj, function ( err, claimant )
		{
			should.not.exist( err );
			should.exist( claimant );
			_.set( testData, 'member.claimant', claimant );

			_.set( searchObj, 'where.id', _.get( testData, 'member.victim.id', 'failedToFindId' ) );
			Member.findOne( searchObj, function ( err, victim )
			{
				should.not.exist( err );
				should.exist( victim );
				_.set( testData, 'member.victim', victim );	
				done();			
			});
		})
	}

	describe( 'Basic merge', function ( ) { // Contacts
		before( requireModels );
		beforeEach( function ( done ) { async.applyEachSeries( [setConfigToModel, setupBasic, updateVictimAndClaimant], 'contact', done ); });
		afterEach( function ( done ) { config = {}; testData = {}; done(); } );

		it( 'Claimant has correct # contacts(' + _.size(testData.contact) + ')', function ( done ) {
			Member.verificationHelpers.mergeAccounts( 0, { claimant: testData.member.claimant, victim: testData.member.victim }, testData.verification.verification, function ( err, result )
			{
				// Should have: all contacts plus dup (5 total)
				Member.findOne({ where: { id: testData.member.claimant.id }, include: 'contacts' }, function ( err, member )
				{
					should.not.exist(err);
					should.exist(member);
					should.exist(member.contacts);
					member.contacts.should.be.a.Function;
					var contacts = member.contacts();
					should.exist(contacts);
					contacts.should.be.an.Array;
					contacts.should.have.length(5);
					done();
				});
			});
		});
		it( 'Victim has correct # contacts (0)', function ( done ) {
			Member.verificationHelpers.mergeAccounts( 0, { claimant: testData.member.claimant, victim: testData.member.victim }, testData.verification.verification, function ( err, result )
			{
				// Should have: 0 contacts
				Member.findOne({ where: { id: testData.member.victim.id }, include: 'contacts' }, function ( err, member )
				{
					should.not.exist(err);
					should.exist(member);
					should.exist(member.contacts);
					member.contacts.should.be.a.Function;
					var contacts = member.contacts();
					should.exist(contacts);
					contacts.should.be.an.Array;
					contacts.should.have.length(0);
					done();
				});
			});
		});			
		it( 'Claimant has correct contacts', function ( done ) {
			Member.verificationHelpers.mergeAccounts( 0, { claimant: testData.member.claimant, victim: testData.member.victim }, testData.verification.verification, function ( err, result )
			{
				// Should have: all contacts plus dup (5 total)
				Member.findOne({ where: { id: testData.member.claimant.id }, include: 'contacts' }, function ( err, member )
				{
					var contacts = member.contacts();
					var contactAddresses = _.pluck( contacts, 'contact' );
					var testValues = _.pluck( testData.contact, 'contact' );
					var foundValues = [];
					_.each( contactAddresses, function ( testContact )
					{
						var idx = _.indexOf( testValues, testContact );
						(idx).should.be.within(0, testValues.length );
						should.equal(-1, _.indexOf( foundValues, testContact )); 
						foundValues.push( testContact );
					});
					done();
				});
			});
		});				
		it( 'Duplicate contact destroyed?', function ( done ) {
			Member.verificationHelpers.mergeAccounts( 0, { claimant: testData.member.claimant, victim: testData.member.victim }, testData.verification.verification, function ( err, result )
			{
				// Should only find one dup
				Contact.find({ where: { contact: testData.contact.dup1.contact } }, function ( err, contacts )
				{
					should.not.exist(err);
					should.exist(contacts);
					contacts.should.have.length(1)
					contacts[0].should.have.property('contact');
					should.equal( testData.contact.dup1.contact, contacts[0].contact );
					done();
				});
			});
		});	
	});
	describe( 'Merge w/multiple uniqueProperties', function ( ) { // SMS
		before( requireModels );
		beforeEach( setupMultipleUniqueProperties );
		it( 'Claimant has correct # sms\'s', function ( done ) {
			Member.verificationHelpers.mergeAccounts( 0, { claimant: testData.member.claimant, victim: testData.member.victim }, testData.verification.verification, function ( err, result )
			{
				// Should have: all sms\'s plus dup (5 total)
				Member.findOne({ where: { id: testData.member.claimant.id }, include: 'sms' }, function ( err, member )
				{
					should.not.exist(err);
					should.exist(member);
					should.exist(member.sms);
					member.sms.should.be.a.Function;
					var sms = member.sms();
					should.exist(sms);
					sms.should.be.an.Array;
					sms.should.have.length(3);
					done();
				});
			});
		});
		it( 'Victim has correct # sms\'s (0)', function ( done ) {
			Member.verificationHelpers.mergeAccounts( 0, { claimant: testData.member.claimant, victim: testData.member.victim }, testData.verification.verification, function ( err, result )
			{
				// Should have: 0 sms\'s
				Member.findOne({ where: { id: testData.member.victim.id }, include: 'sms' }, function ( err, member )
				{
					should.not.exist(err);
					should.exist(member);
					should.exist(member.sms);
					member.sms.should.be.a.Function;
					var sms = member.sms();
					should.exist(sms);
					sms.should.be.an.Array;
					sms.should.have.length(0);
					done();
				});
			});
		});		
		it( 'Claimant has correct sms\'s', function ( done ) {
			Member.verificationHelpers.mergeAccounts( 0, { claimant: testData.member.claimant, victim: testData.member.victim }, testData.verification.verification, function ( err, result )
			{
				// Should have: all sms\'s plus dup (5 total)
				Member.findOne({ where: { id: testData.member.claimant.id }, include: 'sms' }, function ( err, member )
				{
					var sms = member.sms();
					var smsList = _.pluck( sms, 'number' );
					var testValues = _.pluck( testData.sms, 'number' );
					var foundValues = [];
					_.each( smsList, function ( anSMS )
					{
						var idx = _.indexOf( testValues, anSMS );
						(idx).should.be.within(0, testValues.length );
						should.equal(-1, _.indexOf( foundValues, anSMS )); 
						foundValues.push( anSMS );
					});
					done();
				});
			});
		});				
		it( 'Duplicate sms (via number) destroyed?', function ( done ) {
			Member.verificationHelpers.mergeAccounts( 0, { claimant: testData.member.claimant, victim: testData.member.victim }, testData.verification.verification, function ( err, result )
			{
				// Should only find one dup
				SMS.find({ where: { contact: testData.sms.num3.number, channelId: testData.sms.num3.channelId } }, function ( err, numbers )
				{
					should.not.exist(err);
					should.exist(numbers);
					numbers.should.have.length(0)
					done();
				});
			});
		});		
		it( 'Duplicate sms (via channelId) destroyed?', function ( done ) {
			Member.verificationHelpers.mergeAccounts( 0, { claimant: testData.member.claimant, victim: testData.member.victim }, testData.verification.verification, function ( err, result )
			{
				// Should only find one dup
				SMS.find({ where: { contact: testData.sms.num1b.number, channelId: testData.sms.num1b.channelId } }, function ( err, numbers )
				{
					should.not.exist(err);
					should.exist(numbers);
					numbers.should.have.length(0)
					done();
				});
			});
		});						
	});	
	describe( 'Merge with foreignKey', function () { // AccessToken
		before( requireModels );
		beforeEach( setupForeignKey );
		it( 'Claimant has correct # AccessTokens', function ( done ) {
			AccessToken.find( { where: { userId: { ne: testData.member.claimant.id } } }, function ( err, tokens )
			{
				var beforeLength = tokens.length;
				Member.verificationHelpers.mergeAccounts( 0, { claimant: testData.member.claimant, victim: testData.member.victim }, testData.verification.verification, function ( err, result )
				{
					// Should have: all sms\'s plus dup (5 total)
					AccessToken.find({ where: { userId: testData.member.claimant.id } }, function ( err, tokens )
					{
						should.not.exist(err);
						should.exist( tokens );	
						tokens.should.be.an.Array;					
						tokens.should.have.length(2);
						AccessToken.find( { where: { userId: { ne: testData.member.claimant.id } } }, function ( err, otherTokens )
						{						
							should.not.exist(err);
							should.exist( otherTokens );
							otherTokens.should.be.an.Array;
							should.equal( otherTokens.length, beforeLength - 1 );
							done();
						});
					});
				});
			});
		});
		it( 'Victim has correct # AccessTokens', function ( done ) {
			Member.verificationHelpers.mergeAccounts( 0, { claimant: testData.member.claimant, victim: testData.member.victim }, testData.verification.verification, function ( err, result )
			{
				// Should have: all sms\'s plus dup (5 total)
				AccessToken.find({ where: { userId: testData.member.victim.id } }, function ( err, tokens )
				{
					should.not.exist(err);
					should.exist( tokens );
					tokens.should.be.an.Array;
					tokens.should.have.length(0);
					done();
				});
			});
		});		
		it( 'AccessTokens both belong to claimant', function ( done ) {
			Member.verificationHelpers.mergeAccounts( 0, { claimant: testData.member.claimant, victim: testData.member.victim }, testData.verification.verification, function ( err, result )
			{
				// Should have: all sms\'s plus dup (5 total)
				AccessToken.find({ where: { userId: testData.member.claimant.id } }, function ( err, tokens )
				{
					should.not.exist(err);
					should.exist( tokens );
					_.each( tokens, function ( token )
					{
						should.equal( token.userId.toString(), testData.member.claimant.id.toString() );
					})
					done();
				});
			});
		});			
	});
	describe( 'Merge with requiredPropertyForDuplicates', function () { // verification
		before( requireModels );
		beforeEach( function ( done ) { async.applyEachSeries( [setupRequiredPropertyForDuplicates, updateVictimAndClaimant], done ); } );
		it( 'Claimant has correct # verifications', function ( done ) {
			Member.verificationHelpers.mergeAccounts( 0, { claimant: testData.member.claimant, victim: testData.member.victim }, testData.verification.verification, function ( err, result )
			{
				// Should have: all sms\'s plus dup (5 total)
				Member.findOne({ where: { id: testData.member.claimant.id }, include: 'verifications' }, function ( err, member )
				{
					should.not.exist(err);
					should.exist(member);
					should.exist(member.verifications);
					member.verifications.should.be.a.Function;
					var verifications = member.verifications();
					should.exist(verifications);
					verifications.should.be.an.Array;
					verifications.should.have.length(2);
					done();
				});
			});
		});
		it( 'Victim has correct # verifications', function ( done ) {
			Member.verificationHelpers.mergeAccounts( 0, { claimant: testData.member.claimant, victim: testData.member.victim }, testData.verification.verification, function ( err, result )
			{
				// Should have: all sms\'s plus dup (5 total)
				Member.findOne({ where: { id: testData.member.victim.id }, include: 'verifications' }, function ( err, member )
				{
					should.not.exist(err);
					should.exist(member);
					should.exist(member.verifications);
					member.verifications.should.be.a.Function;
					var verifications = member.verifications();
					should.exist(verifications);
					verifications.should.be.an.Array;
					verifications.should.have.length(0);
					done();
				});
			});
		});		
		it( 'Verifications both belong to claimant', function ( done ) {
			Member.verificationHelpers.mergeAccounts( 0, { claimant: testData.member.claimant, victim: testData.member.victim }, testData.verification.verification, function ( err, result )
			{
				// Should have: all sms\'s plus dup (5 total)
				Member.findOne({ where: { id: testData.member.claimant.id }, include: 'verifications' }, function ( err, member )
				{
					var verifications = member.verifications();
					should.not.exist(err);
					should.exist( verifications );
					_.each( verifications, function ( verification )
					{
						should.equal( verification.memberId.toString(), testData.member.claimant.id.toString() );
						should.equal( verification.verifyAddress, testData.verification.verification.verifyAddress );
					})
					done();
				});
			});
		});			
	});	
}
module.exports = runTests;*/
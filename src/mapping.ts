import { BigInt } from "@graphprotocol/graph-ts"
import { log } from '@graphprotocol/graph-ts'

const platofrmId =  "0x39bea80e7720932f5ef0db947964fa325382ba8fe519ff0586e972a55eca12c3"

import {
  AmaFansCore,
  AmountReceived,
  Blocked,
  UnBlock,
  Whitelisted, 
  UnWhitelisted,
  JunkResponse,
  Follow,
  UnFollow,
  Paused,
  QuestionAnswered,
  QuestionCreated,
  QuestionValueClaimed,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  TipCreated,
  TipValueClaimed,
  Unpaused,
  Withdraw
} from "../generated/AmaFansCore/AmaFansCore"



import { AmountReceivedEntity, QuestionAnsweredEntity, QuestionCreatedEntity, QuestionValueClaimedEntity,
  TipCreatedEntity, TipValueClaimedEntity, AmaUserEntity, BlockedEntity, UnBlockedEntity,
  FollowEntity, UnFollowEntity, WhitelistedEntity, UnWhitelistedEntity, WithdrawEntity,
    JunkResponseEntity, PlatformIdentity} from "../generated/schema"

export function handleAmountReceived(event: AmountReceived): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let entity = new AmountReceivedEntity(id)
  entity.sender = event.params.sender.toHexString()
  entity.value = event.params.value
  entity.createdAt = event.block.timestamp
  entity.txHash =  event.transaction.hash.toHex()

  entity.save()  

}


function insertUser(userAddress: string, timestamp: BigInt): AmaUserEntity{
  let platform= PlatformIdentity.load(platofrmId);
  if (!platform) {
    platform = new PlatformIdentity(platofrmId)
  }
  if (!platform.totalUsers) {
    platform.totalUsers = BigInt.fromI32(0)  
  }
  platform.totalUsers = platform.totalUsers.plus(BigInt.fromI32(1))
  platform.save()





  log.debug('New user created {}', [userAddress])
    let user = new AmaUserEntity(userAddress)
    user.address = userAddress
    user.createdAt = timestamp


    user.questionsCreated = BigInt.fromI32(0)
    user.tipsCreated = BigInt.fromI32(0)
    user.blockUserCreated = BigInt.fromI32(0)
    user.followers = BigInt.fromI32(0)
    user.whitelistUserCreated =  BigInt.fromI32(0)
    user.answersCreated = BigInt.fromI32(0)
    user.junkResponseCreated = BigInt.fromI32(0)
  
    user.questionsReceived = BigInt.fromI32(0)
    user.answersReceived = BigInt.fromI32(0)
    user.blockUserReceived = BigInt.fromI32(0)
    user.following = BigInt.fromI32(0)
    user.whitelistUserReceived = BigInt.fromI32(0)
    user.junkResponseReceived = BigInt.fromI32(0)
  
    user.valueSpentOnTips = BigInt.fromI32(0)
    user.valueSpentOnQuestions = BigInt.fromI32(0)


    user.valueReceivedOnQuestions = BigInt.fromI32(0)
    user.valueReceivedOnAnswers = BigInt.fromI32(0)
    user.valueReceivedOnTips = BigInt.fromI32(0)


    user.questionsClaimedBack = BigInt.fromI32(0)
    user.tipsClaimedBack = BigInt.fromI32(0)
  
    user.questionsValueClaimedBack = BigInt.fromI32(0)
    user.tipsValueClaimedBack = BigInt.fromI32(0)
  
    user.twitterId = BigInt.fromI32(0)
    user.twitterUsername = ""

    user.earningsWithdrawn = BigInt.fromI32(0)
    return user
  }



  export function handleJunkResponse(event: JunkResponse): void {
    let _junkReponse = new JunkResponseEntity(event.params.questionId.toHexString())
    _junkReponse.questionId = event.params.questionId
    _junkReponse.owner = event.params.owner.toHexString() 
    _junkReponse.answerer = event.params.answerer.toHexString() 
    _junkReponse.createdAt = event.block.timestamp
    _junkReponse.txHash =  event.transaction.hash.toHex()

    _junkReponse.save()


    let owner = AmaUserEntity.load(event.params.owner.toHexString())
    if(owner == null){
      owner = insertUser(event.params.owner.toHexString(), event.block.timestamp)
    }
  
    if (owner.junkResponseCreated !== null){
      owner.junkResponseCreated = owner.junkResponseCreated.abs().plus(BigInt.fromI32(1))
        }else{
      owner.junkResponseCreated = BigInt.fromI32(1)
      }
    owner.save()
  
    let answerer = AmaUserEntity.load(event.params.answerer.toHexString())
    if(answerer == null){
      answerer = insertUser(event.params.answerer.toHexString(), event.block.timestamp)
    }
  
    if (answerer.junkResponseReceived !== null){
      answerer.junkResponseReceived = answerer.junkResponseReceived.abs().plus(BigInt.fromI32(1))        
      }else{
        answerer.junkResponseReceived = BigInt.fromI32(1)
      }
    answerer.save()


    let questionCreated = QuestionCreatedEntity.load(event.params.questionId.toHexString())
    if (questionCreated){
  
      questionCreated.junkResponse = true
      questionCreated.save()
    }
  
  }




export function handleBlocked(event: Blocked): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let blocked = new BlockedEntity(id)
  blocked.sender = event.params.blocker.toHexString()
  blocked.receiver = event.params.blocked.toHexString()
  blocked.createdAt = event.block.timestamp
  blocked.txHash =  event.transaction.hash.toHex()

  blocked.save()
  let sender = AmaUserEntity.load(event.params.blocker.toHexString())
  if(sender == null){
    sender = insertUser(event.params.blocker.toHexString(), event.block.timestamp)
  }

    if (sender.blockUserCreated !== null){
      sender.blockUserCreated = sender.blockUserCreated.abs().plus(BigInt.fromI32(1))
            
      }else{
        sender.blockUserCreated = BigInt.fromI32(1)
      }
    sender.save()

  let receiver = AmaUserEntity.load(event.params.blocked.toHexString())
  if(!receiver){
    receiver = insertUser(event.params.blocked.toHexString(), event.block.timestamp)

  } 
  if (receiver.blockUserReceived){
    receiver.blockUserReceived = receiver.blockUserReceived.plus(BigInt.fromI32(1))
          
    }else{
      receiver.blockUserReceived = BigInt.fromI32(1)
    }
    
  receiver.save()

}

export function handleUnBlock(event: UnBlock): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let unblocked = new UnBlockedEntity(id)
  unblocked.sender = event.params.unblocker.toHexString()
  unblocked.receiver = event.params.unblocked.toHexString()
  unblocked.createdAt = event.block.timestamp
  unblocked.txHash =  event.transaction.hash.toHex()

  unblocked.save()
  let sender = AmaUserEntity.load(event.params.unblocker.toHexString())

  if(sender){
    sender.blockUserCreated = sender.blockUserCreated.abs().minus(BigInt.fromI32(1))
    sender.save()
  }

  let receiver = AmaUserEntity.load(event.params.unblocked.toHexString())

  if (receiver){
    receiver.blockUserReceived  = receiver.blockUserReceived.minus(BigInt.fromI32(1))
    receiver.save()
    }
}




export function handleWhitelisted(event: Whitelisted): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let whitelisted = new WhitelistedEntity(id)
  whitelisted.sender = event.params.whitelister.toHexString()
  whitelisted.receiver = event.params.whitelister.toHexString()
  whitelisted.createdAt = event.block.timestamp
  whitelisted.txHash =  event.transaction.hash.toHex()

  whitelisted.save()
  let sender = AmaUserEntity.load(event.params.whitelister.toHexString())
  if(sender == null){
    sender = insertUser(event.params.whitelister.toHexString(), event.block.timestamp)
  }

    if (sender.whitelistUserCreated !== null){
      sender.whitelistUserCreated = sender.whitelistUserCreated.abs().plus(BigInt.fromI32(1))
            
      }else{
        sender.whitelistUserCreated = BigInt.fromI32(1)
      }
    sender.save()

  let receiver = AmaUserEntity.load(event.params.whitelisted.toHexString())
  if(!receiver){
    receiver = insertUser(event.params.whitelisted.toHexString(), event.block.timestamp)

  } 
  if (receiver.whitelistUserReceived){
    receiver.whitelistUserReceived = receiver.whitelistUserReceived.plus(BigInt.fromI32(1))
          
    }else{
      receiver.whitelistUserReceived = BigInt.fromI32(1)
    }
    
  receiver.save()

}

export function handleUnWhitelisted(event: UnWhitelisted): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let unWhitelisted = new UnWhitelistedEntity(id)
  unWhitelisted.sender = event.params.unwhitelister.toHexString()
  unWhitelisted.receiver = event.params.unwhitelisted.toHexString()
  unWhitelisted.createdAt = event.block.timestamp
  unWhitelisted.txHash =  event.transaction.hash.toHex()

  unWhitelisted.save()
  let sender = AmaUserEntity.load(event.params.unwhitelister.toHexString())

  if(sender){
    sender.whitelistUserCreated = sender.whitelistUserCreated.abs().minus(BigInt.fromI32(1))
    sender.save()
  }

  let receiver = AmaUserEntity.load(event.params.unwhitelisted.toHexString())

  if (receiver){
    receiver.whitelistUserReceived = receiver.whitelistUserReceived.minus(BigInt.fromI32(1))
    receiver.save()
    }
}



export function handleFollow(event: Follow): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let follow = new FollowEntity(id)
  follow.followed = event.params.followed.toHexString()
  follow.follower = event.params.follower.toHexString()
  follow.createdAt = event.block.timestamp
  follow.txHash =  event.transaction.hash.toHex()

  follow.save()

  // The person who is actually started following so his follwoing count shall be incremented
  let userStartedFollowing = AmaUserEntity.load(event.params.follower.toHexString())
  if(userStartedFollowing == null){
    userStartedFollowing = insertUser(event.params.follower.toHexString(), event.block.timestamp)
  }

  if (userStartedFollowing.following!== null){
      userStartedFollowing.following = userStartedFollowing.following.abs().plus(BigInt.fromI32(1))
      }else{
      userStartedFollowing.following = BigInt.fromI32(1)
    }
    userStartedFollowing.save()


  // The person who is being followed so his follower count shall be incremented
  let userBeingFollowed = AmaUserEntity.load(event.params.followed.toHexString())
  if(!userBeingFollowed){
    userBeingFollowed = insertUser(event.params.followed.toHexString(), event.block.timestamp)

  } 
  if (userBeingFollowed.followers){
    userBeingFollowed.followers = userBeingFollowed.followers.plus(BigInt.fromI32(1))
          
    }else{
      userBeingFollowed.followers = BigInt.fromI32(1)
    }
    
    userBeingFollowed.save()

}

export function handleUnFollow(event: UnFollow): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let unFollow = new UnFollowEntity(id)
  unFollow.unFollower = event.params.unfollower.toHexString()
  unFollow.unFollowed = event.params.unfollowed.toHexString()
  unFollow.createdAt = event.block.timestamp
  unFollow.txHash =  event.transaction.hash.toHex()

  unFollow.save()
  let userWhoUnfollowed = AmaUserEntity.load(event.params.unfollowed.toHexString())

  if(userWhoUnfollowed){
    userWhoUnfollowed.following = userWhoUnfollowed.following.abs().minus(BigInt.fromI32(1))
    userWhoUnfollowed.save()
  }

  let userWhoLostFollower = AmaUserEntity.load(event.params.unfollower.toHexString())

  if (userWhoLostFollower){
    userWhoLostFollower.followers = userWhoLostFollower.followers.minus(BigInt.fromI32(1))
    userWhoLostFollower.save()
    }
}







export function handleQuestionAnswered(event: QuestionAnswered): void {
  let platform= PlatformIdentity.load(platofrmId);
  if (!platform) {
    platform = new PlatformIdentity(platofrmId)
  }
  if (!platform.totalQuestionsAnswered) {
    platform.totalQuestionsAnswered = BigInt.fromI32(0)  
  }
  if (!platform.totalValueReceivedOnAnswers) {
    platform.totalValueReceivedOnAnswers = BigInt.fromI32(0)  
  }


  platform.totalValueReceivedOnAnswers = platform.totalValueReceivedOnAnswers.plus(event.params.value)
  platform.totalQuestionsAnswered = platform.totalQuestionsAnswered.plus(BigInt.fromI32(1))
  platform.save()




  log.debug('QuestionAnswered: Block number: {}, block hash: {}, transaction hash: {}', [
    event.block.number.toString(), // "47596000"
    event.block.hash.toHexString(), // "0x..."
    event.transaction.hash.toHexString(), // "0x..."
  ])

  let question = new QuestionAnsweredEntity(event.params.questionId.toHexString())
  question.questionId = event.params.questionId

  question.owner = event.params.owner.toHexString() 
  question.creator = event.params.creator.toHexString()
  question.tokenId = event.params.tokenId
  question.answerLink = event.params.answerLink
  question.value = event.params.value
  question.createdAt = event.block.timestamp
  question.txHash =  event.transaction.hash.toHex()

  question.save()

  //Updating QuestionCreatedEntity
  let questionCreated = QuestionCreatedEntity.load(event.params.questionId.toHexString())
  if (questionCreated){

    questionCreated.answered = true
    questionCreated.answerLink = event.params.answerLink
    questionCreated.save()
  }

  //Update creator on question Answered
  let owner = AmaUserEntity.load(event.params.owner.toHexString())
  if (owner){
    if (!owner.answersReceived) {
      owner.answersReceived = BigInt.fromI32(0)  
    }
    owner.answersReceived = owner.answersReceived.plus(BigInt.fromI32(1))
    owner.save()

  }

  //Update answerer on question Answered
  let creator = AmaUserEntity.load(event.params.creator.toHexString())
  if (creator){
      if (!creator.answersCreated) {
        creator.answersCreated = BigInt.fromI32(0)  
      }

      if (!creator.valueReceivedOnAnswers) {
        creator.valueReceivedOnAnswers = BigInt.fromI32(0)  
      }

      creator.answersCreated = creator.answersCreated.plus(BigInt.fromI32(1))
      creator.valueReceivedOnAnswers = creator.valueReceivedOnAnswers.plus(event.params.value)
      creator.save()
    }
}

export function handleQuestionCreated(event: QuestionCreated): void {
  let platform= PlatformIdentity.load(platofrmId);
  if (!platform) {
    platform = new PlatformIdentity(platofrmId)
  }
  if (!platform.totalValueSpentOnQuestions) {
    platform.totalValueSpentOnQuestions = BigInt.fromI32(0)  
  }
  if (!platform.totalQuestionsAsked) {
    platform.totalQuestionsAsked = BigInt.fromI32(0)  
  }


  platform.totalValueSpentOnQuestions = platform.totalValueSpentOnQuestions.plus(event.params.value)
  platform.totalQuestionsAsked = platform.totalQuestionsAsked.plus(BigInt.fromI32(1))
  platform.save()



  log.debug('QuestionCreated: Block number: {}, block hash: {}, transaction hash: {}', [
    event.block.number.toString(), // "47596000"
    event.block.hash.toHexString(), // "0x..."
    event.transaction.hash.toHexString(), // "0x..."
  ])

  let newQuestion = new QuestionCreatedEntity(event.params.questionId.toHexString())

  let senderId = event.params.createdBy.toHexString()
  let recipientId = event.params.recipient.toHexString()

  let sender = AmaUserEntity.load(senderId)
  let recipient = AmaUserEntity.load(recipientId)



  if (!sender) {
    log.info('Sender couldnt be found {}', [senderId])
    sender = insertUser(senderId, event.block.timestamp)
  }

  if (!sender.questionsCreated){
    sender.questionsCreated = BigInt.fromI32(0)

  }

  if (!sender.valueSpentOnQuestions){
    sender.valueSpentOnQuestions = BigInt.fromI32(0)

  }

  
  sender.questionsCreated  =  sender.questionsCreated.plus(BigInt.fromI32(1))
  sender.valueSpentOnQuestions  = sender.valueSpentOnQuestions.plus(event.params.value)
  sender.save()


  if (!recipient) {
    log.info('Recipient couldnt be found {}', [recipientId])
    recipient = insertUser(recipientId, event.block.timestamp)
    
  }

  if (!recipient.questionsReceived){
    recipient.questionsReceived = BigInt.fromI32(0)

  }

  if (!recipient.valueReceivedOnQuestions){
    recipient.valueReceivedOnQuestions = BigInt.fromI32(0)

  }

  recipient.questionsReceived  =  recipient.questionsReceived.plus(BigInt.fromI32(1))
  recipient.valueReceivedOnQuestions  = recipient.valueReceivedOnQuestions.plus(event.params.value)
  recipient.save()





  newQuestion.recipient = event.params.recipient.toHexString()
  newQuestion.questionId = event.params.questionId
  newQuestion.createdBy = event.params.createdBy.toHexString()
  newQuestion.value = event.params.value
  newQuestion.expiryTime = event.params.expiryTime
  newQuestion.link = event.params.link
  newQuestion.answered = false
  newQuestion.claimed = false
  newQuestion.junkResponse = false

  newQuestion.createdAt = event.block.timestamp
  newQuestion.tips = BigInt.fromI32(0)
  newQuestion.tipsTotalValue = BigInt.fromI32(0)
  newQuestion.txHash =  event.transaction.hash.toHex()

  newQuestion.save()
}

export function handleQuestionValueClaimed(event: QuestionValueClaimed): void {
  let platform= PlatformIdentity.load(platofrmId);
  if (!platform) {
    platform = new PlatformIdentity(platofrmId)
  }
  if (!platform.totalValueClaimedBackOnQuestions) {
    platform.totalValueClaimedBackOnQuestions = BigInt.fromI32(0)  
  }
  if (!platform.totalQuestionsClaimedBack) {
    platform.totalQuestionsClaimedBack = BigInt.fromI32(0)  
  }


  platform.totalValueClaimedBackOnQuestions = platform.totalValueClaimedBackOnQuestions.plus(event.params.value)
  platform.totalQuestionsClaimedBack = platform.totalQuestionsClaimedBack.plus(BigInt.fromI32(1))
  platform.save()





  log.debug('QuestionValueClaimed: Block number: {}, block hash: {}, transaction hash: {}', [
    event.block.number.toString(), // "47596000"
    event.block.hash.toHexString(), // "0x..."
    event.transaction.hash.toHexString(), // "0x..."
  ])

  let question = new QuestionValueClaimedEntity(event.params.questionId.toHexString())
  question.questionId = event.params.questionId
  question.createdBy = event.params.createdBy.toHexString() 
  question.value = event.params.value
  question.createdAt = event.block.timestamp
  question.txHash =  event.transaction.hash.toHex()

  question.save()

  //Changing claimed  in QuestionCreatedEntity
  let questionCreated = QuestionCreatedEntity.load(event.params.questionId.toHexString())
  if (questionCreated){
    questionCreated.claimed = true
    questionCreated.save()
  }

  let user = AmaUserEntity.load(event.params.createdBy.toHexString())
  if (user){
    if (!user.questionsClaimedBack) {
      user.questionsClaimedBack = BigInt.fromI32(0)  
    }
    if (!user.questionsValueClaimedBack) {
      user.questionsValueClaimedBack = BigInt.fromI32(0)  
    }


    user.questionsClaimedBack = user.questionsClaimedBack.plus(BigInt.fromI32(1))
    user.questionsValueClaimedBack = user.questionsValueClaimedBack.plus(event.params.value)
    user.save()
  }


}


export function handleTipCreated(event: TipCreated): void {
  let platform= PlatformIdentity.load(platofrmId);
  if (!platform) {
    platform = new PlatformIdentity(platofrmId)
  }
  if (!platform.totalTipsMade) {
    platform.totalTipsMade = BigInt.fromI32(0)  
  }
  if (!platform.totalValueSpentOnTips) {
    platform.totalValueSpentOnTips = BigInt.fromI32(0)  
  }


  platform.totalValueSpentOnTips = platform.totalValueSpentOnTips.plus(event.params.value)
  platform.totalTipsMade = platform.totalTipsMade.plus(BigInt.fromI32(1))
  platform.save()





  log.debug('TipCreated: Block number: {}, block hash: {}, transaction hash: {}', [
    event.block.number.toString(), // "47596000"
    event.block.hash.toHexString(), // "0x..."
    event.transaction.hash.toHexString(), // "0x..."
  ])
  let senderId = event.params.createdBy.toHexString()

  let sender = AmaUserEntity.load(senderId)

  if (!sender) {
    sender = insertUser(senderId, event.block.timestamp)


  }

  if (!sender.tipsCreated){
    sender.tipsCreated = BigInt.fromI32(0)
  }

  if (!sender.valueSpentOnTips){
    sender.valueSpentOnTips = BigInt.fromI32(0)

  }

  
  sender.tipsCreated  =  sender.tipsCreated.plus(BigInt.fromI32(1))
  sender.valueSpentOnTips  = sender.valueSpentOnTips.plus(event.params.value)
  sender.save()


  let tip  = new TipCreatedEntity(event.params.tipId.toHex())
  tip.questionId = event.params.questionId
  tip.tipId = event.params.tipId
  tip.createdBy = event.params.createdBy.toHexString()
  tip.value = event.params.value
  tip.claimed = false
  tip.createdAt = event.block.timestamp
  tip.txHash =  event.transaction.hash.toHex()

  tip.save()
  
  let question = QuestionCreatedEntity.load(event.params.questionId.toHexString())
  if (question) {
    question.tips  =  question.tips.plus(BigInt.fromI32(1))
    question.tipsTotalValue = question.tipsTotalValue.plus(event.params.value)
    question.save()

    let user = AmaUserEntity.load(question.createdBy)
    if(user){
      if (!user.valueReceivedOnTips) {
        user.valueReceivedOnTips = BigInt.fromI32(0)  
      }
  

      user.valueReceivedOnTips = user.valueReceivedOnTips.plus(event.params.value)
      user.save()

    }
    
  }

}



export function handleTipValueClaimed(event: TipValueClaimed): void {
  let platform= PlatformIdentity.load(platofrmId);
  if (!platform) {
    platform = new PlatformIdentity(platofrmId)
  }
  if (!platform.totalTipsClaimedBack) {
    platform.totalTipsClaimedBack = BigInt.fromI32(0)  
  }
  if (!platform.totalValueClaimedBackOnTips) {
    platform.totalValueClaimedBackOnTips = BigInt.fromI32(0)  
  }


  platform.totalValueClaimedBackOnTips = platform.totalValueClaimedBackOnTips.plus(event.params.value)
  platform.totalTipsClaimedBack = platform.totalTipsClaimedBack.plus(BigInt.fromI32(1))
  platform.save()





  log.debug('TipValueClaimed: Block number: {}, block hash: {}, transaction hash: {}', [
    event.block.number.toString(), // "47596000"
    event.block.hash.toHexString(), // "0x..."
    event.transaction.hash.toHexString(), // "0x..."
  ])
  let tip  = new TipValueClaimedEntity(event.params.tipId.toHex())
  tip.questionId = event.params.questionId
  tip.tipId = event.params.tipId
  tip.createdBy = event.params.createdBy.toHexString()
  tip.value = event.params.value
  tip.createdAt = event.block.timestamp
  tip.txHash =  event.transaction.hash.toHex()

  tip.save()


  //Marking tip as claimed in TipCreatedEntity
  let tipCreated  = TipCreatedEntity.load(event.params.tipId.toHex())
  if (tipCreated) {
    tipCreated.claimed = true
    tipCreated.save()
  }


  //Changing userEntity as claimed in TipCreatedEntity
  let user = AmaUserEntity.load(event.params.createdBy.toHexString())
  if (user){
    if (!user.tipsClaimedBack) {
      user.tipsClaimedBack = BigInt.fromI32(0)  
    }

    if (!user.tipsValueClaimedBack) {
      user.tipsValueClaimedBack = BigInt.fromI32(0)  
    }

    user.tipsClaimedBack = user.tipsClaimedBack.plus(BigInt.fromI32(1))
    user.tipsValueClaimedBack = user.tipsValueClaimedBack.plus(event.params.value)
    user.save()
  }

}

export function handleUnpaused(event: Unpaused): void {}

export function handleWithdraw(event: Withdraw): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let withdrawEvent = new WithdrawEntity(id)
  withdrawEvent.user = event.params.user.toHexString()
  withdrawEvent.value = event.params.value
  withdrawEvent.createdAt = event.block.timestamp
  withdrawEvent.txHash =  event.transaction.hash.toHex()

  withdrawEvent.save()
  let user = AmaUserEntity.load(event.params.user.toHexString())
  if(user == null){
    user = insertUser(event.params.user.toHexString(), event.block.timestamp)
  }

    if (user.earningsWithdrawn !== null){
      user.earningsWithdrawn = user.earningsWithdrawn.abs().plus(BigInt.fromI32(1))
            
      }else{
        user.earningsWithdrawn = BigInt.fromI32(1)
      }
    user.save()



}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}


export function handlePaused(event: Paused): void {}

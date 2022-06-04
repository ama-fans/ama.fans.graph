// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Blocked extends ethereum.Event {
  get params(): Blocked__Params {
    return new Blocked__Params(this);
  }
}

export class Blocked__Params {
  _event: Blocked;

  constructor(event: Blocked) {
    this._event = event;
  }

  get blocker(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get blocked(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Follow extends ethereum.Event {
  get params(): Follow__Params {
    return new Follow__Params(this);
  }
}

export class Follow__Params {
  _event: Follow;

  constructor(event: Follow) {
    this._event = event;
  }

  get followed(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get follower(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class UnBlock extends ethereum.Event {
  get params(): UnBlock__Params {
    return new UnBlock__Params(this);
  }
}

export class UnBlock__Params {
  _event: UnBlock;

  constructor(event: UnBlock) {
    this._event = event;
  }

  get unblocker(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get unblocked(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class UnFollow extends ethereum.Event {
  get params(): UnFollow__Params {
    return new UnFollow__Params(this);
  }
}

export class UnFollow__Params {
  _event: UnFollow;

  constructor(event: UnFollow) {
    this._event = event;
  }

  get unfollowed(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get unfollower(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class UnWhitelisted extends ethereum.Event {
  get params(): UnWhitelisted__Params {
    return new UnWhitelisted__Params(this);
  }
}

export class UnWhitelisted__Params {
  _event: UnWhitelisted;

  constructor(event: UnWhitelisted) {
    this._event = event;
  }

  get unwhitelister(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get unwhitelisted(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Whitelisted extends ethereum.Event {
  get params(): Whitelisted__Params {
    return new Whitelisted__Params(this);
  }
}

export class Whitelisted__Params {
  _event: Whitelisted;

  constructor(event: Whitelisted) {
    this._event = event;
  }

  get whitelister(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get whitelisted(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Withdraw extends ethereum.Event {
  get params(): Withdraw__Params {
    return new Withdraw__Params(this);
  }
}

export class Withdraw__Params {
  _event: Withdraw;

  constructor(event: Withdraw) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class UserFacet extends ethereum.SmartContract {
  static bind(address: Address): UserFacet {
    return new UserFacet("UserFacet", address);
  }

  checkBlocked(blocked_: Address, blocker_: Address): boolean {
    let result = super.call(
      "checkBlocked",
      "checkBlocked(address,address):(bool)",
      [
        ethereum.Value.fromAddress(blocked_),
        ethereum.Value.fromAddress(blocker_)
      ]
    );

    return result[0].toBoolean();
  }

  try_checkBlocked(
    blocked_: Address,
    blocker_: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "checkBlocked",
      "checkBlocked(address,address):(bool)",
      [
        ethereum.Value.fromAddress(blocked_),
        ethereum.Value.fromAddress(blocker_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  checkFollower(sender_: Address, recipient_: Address): boolean {
    let result = super.call(
      "checkFollower",
      "checkFollower(address,address):(bool)",
      [
        ethereum.Value.fromAddress(sender_),
        ethereum.Value.fromAddress(recipient_)
      ]
    );

    return result[0].toBoolean();
  }

  try_checkFollower(
    sender_: Address,
    recipient_: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "checkFollower",
      "checkFollower(address,address):(bool)",
      [
        ethereum.Value.fromAddress(sender_),
        ethereum.Value.fromAddress(recipient_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  checkWhitelist(whitelisted_: Address, whitelister_: Address): boolean {
    let result = super.call(
      "checkWhitelist",
      "checkWhitelist(address,address):(bool)",
      [
        ethereum.Value.fromAddress(whitelisted_),
        ethereum.Value.fromAddress(whitelister_)
      ]
    );

    return result[0].toBoolean();
  }

  try_checkWhitelist(
    whitelisted_: Address,
    whitelister_: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "checkWhitelist",
      "checkWhitelist(address,address):(bool)",
      [
        ethereum.Value.fromAddress(whitelisted_),
        ethereum.Value.fromAddress(whitelister_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getUserMinimumBid(
    _sender: Address,
    _recipient: Address,
    _messageType: BigInt
  ): BigInt {
    let result = super.call(
      "getUserMinimumBid",
      "getUserMinimumBid(address,address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(_sender),
        ethereum.Value.fromAddress(_recipient),
        ethereum.Value.fromUnsignedBigInt(_messageType)
      ]
    );

    return result[0].toBigInt();
  }

  try_getUserMinimumBid(
    _sender: Address,
    _recipient: Address,
    _messageType: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getUserMinimumBid",
      "getUserMinimumBid(address,address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(_sender),
        ethereum.Value.fromAddress(_recipient),
        ethereum.Value.fromUnsignedBigInt(_messageType)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class BlockUserCall extends ethereum.Call {
  get inputs(): BlockUserCall__Inputs {
    return new BlockUserCall__Inputs(this);
  }

  get outputs(): BlockUserCall__Outputs {
    return new BlockUserCall__Outputs(this);
  }
}

export class BlockUserCall__Inputs {
  _call: BlockUserCall;

  constructor(call: BlockUserCall) {
    this._call = call;
  }

  get address_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class BlockUserCall__Outputs {
  _call: BlockUserCall;

  constructor(call: BlockUserCall) {
    this._call = call;
  }
}

export class FollowUserCall extends ethereum.Call {
  get inputs(): FollowUserCall__Inputs {
    return new FollowUserCall__Inputs(this);
  }

  get outputs(): FollowUserCall__Outputs {
    return new FollowUserCall__Outputs(this);
  }
}

export class FollowUserCall__Inputs {
  _call: FollowUserCall;

  constructor(call: FollowUserCall) {
    this._call = call;
  }

  get address_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class FollowUserCall__Outputs {
  _call: FollowUserCall;

  constructor(call: FollowUserCall) {
    this._call = call;
  }
}

export class SetUserMinimumBidCall extends ethereum.Call {
  get inputs(): SetUserMinimumBidCall__Inputs {
    return new SetUserMinimumBidCall__Inputs(this);
  }

  get outputs(): SetUserMinimumBidCall__Outputs {
    return new SetUserMinimumBidCall__Outputs(this);
  }
}

export class SetUserMinimumBidCall__Inputs {
  _call: SetUserMinimumBidCall;

  constructor(call: SetUserMinimumBidCall) {
    this._call = call;
  }

  get minimumBidByUser(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _messageType(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetUserMinimumBidCall__Outputs {
  _call: SetUserMinimumBidCall;

  constructor(call: SetUserMinimumBidCall) {
    this._call = call;
  }
}

export class UnBlockUserCall extends ethereum.Call {
  get inputs(): UnBlockUserCall__Inputs {
    return new UnBlockUserCall__Inputs(this);
  }

  get outputs(): UnBlockUserCall__Outputs {
    return new UnBlockUserCall__Outputs(this);
  }
}

export class UnBlockUserCall__Inputs {
  _call: UnBlockUserCall;

  constructor(call: UnBlockUserCall) {
    this._call = call;
  }

  get address_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UnBlockUserCall__Outputs {
  _call: UnBlockUserCall;

  constructor(call: UnBlockUserCall) {
    this._call = call;
  }
}

export class UnWhitelistUserCall extends ethereum.Call {
  get inputs(): UnWhitelistUserCall__Inputs {
    return new UnWhitelistUserCall__Inputs(this);
  }

  get outputs(): UnWhitelistUserCall__Outputs {
    return new UnWhitelistUserCall__Outputs(this);
  }
}

export class UnWhitelistUserCall__Inputs {
  _call: UnWhitelistUserCall;

  constructor(call: UnWhitelistUserCall) {
    this._call = call;
  }

  get address_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UnWhitelistUserCall__Outputs {
  _call: UnWhitelistUserCall;

  constructor(call: UnWhitelistUserCall) {
    this._call = call;
  }
}

export class UnfollowUserCall extends ethereum.Call {
  get inputs(): UnfollowUserCall__Inputs {
    return new UnfollowUserCall__Inputs(this);
  }

  get outputs(): UnfollowUserCall__Outputs {
    return new UnfollowUserCall__Outputs(this);
  }
}

export class UnfollowUserCall__Inputs {
  _call: UnfollowUserCall;

  constructor(call: UnfollowUserCall) {
    this._call = call;
  }

  get address_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UnfollowUserCall__Outputs {
  _call: UnfollowUserCall;

  constructor(call: UnfollowUserCall) {
    this._call = call;
  }
}

export class WhitelistUserCall extends ethereum.Call {
  get inputs(): WhitelistUserCall__Inputs {
    return new WhitelistUserCall__Inputs(this);
  }

  get outputs(): WhitelistUserCall__Outputs {
    return new WhitelistUserCall__Outputs(this);
  }
}

export class WhitelistUserCall__Inputs {
  _call: WhitelistUserCall;

  constructor(call: WhitelistUserCall) {
    this._call = call;
  }

  get address_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class WhitelistUserCall__Outputs {
  _call: WhitelistUserCall;

  constructor(call: WhitelistUserCall) {
    this._call = call;
  }
}

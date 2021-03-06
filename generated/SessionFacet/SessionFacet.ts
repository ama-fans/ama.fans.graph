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

export class AmountReceived extends ethereum.Event {
  get params(): AmountReceived__Params {
    return new AmountReceived__Params(this);
  }
}

export class AmountReceived__Params {
  _event: AmountReceived;

  constructor(event: AmountReceived) {
    this._event = event;
  }

  get receiver(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class SessionCreated extends ethereum.Event {
  get params(): SessionCreated__Params {
    return new SessionCreated__Params(this);
  }
}

export class SessionCreated__Params {
  _event: SessionCreated;

  constructor(event: SessionCreated) {
    this._event = event;
  }

  get sessionId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get owner(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get startTime(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get endTime(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get rewardPerAMA(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get rewardPool(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get link(): string {
    return this._event.parameters[6].value.toString();
  }
}

export class SessionEndTimeUpdated extends ethereum.Event {
  get params(): SessionEndTimeUpdated__Params {
    return new SessionEndTimeUpdated__Params(this);
  }
}

export class SessionEndTimeUpdated__Params {
  _event: SessionEndTimeUpdated;

  constructor(event: SessionEndTimeUpdated) {
    this._event = event;
  }

  get sessionId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get newEndTime(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get additionalTime(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class SessionEndedBeforeTime extends ethereum.Event {
  get params(): SessionEndedBeforeTime__Params {
    return new SessionEndedBeforeTime__Params(this);
  }
}

export class SessionEndedBeforeTime__Params {
  _event: SessionEndedBeforeTime;

  constructor(event: SessionEndedBeforeTime) {
    this._event = event;
  }

  get sessionId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get oldEndTime(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get newTime(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class SessionLinkUpdated extends ethereum.Event {
  get params(): SessionLinkUpdated__Params {
    return new SessionLinkUpdated__Params(this);
  }
}

export class SessionLinkUpdated__Params {
  _event: SessionLinkUpdated;

  constructor(event: SessionLinkUpdated) {
    this._event = event;
  }

  get sessionId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get link(): string {
    return this._event.parameters[1].value.toString();
  }
}

export class SessionRewardLeftClaimed extends ethereum.Event {
  get params(): SessionRewardLeftClaimed__Params {
    return new SessionRewardLeftClaimed__Params(this);
  }
}

export class SessionRewardLeftClaimed__Params {
  _event: SessionRewardLeftClaimed;

  constructor(event: SessionRewardLeftClaimed) {
    this._event = event;
  }

  get sessionId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get rewardLeft(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class SessionTopUp extends ethereum.Event {
  get params(): SessionTopUp__Params {
    return new SessionTopUp__Params(this);
  }
}

export class SessionTopUp__Params {
  _event: SessionTopUp;

  constructor(event: SessionTopUp) {
    this._event = event;
  }

  get sessionId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get newRewardPool(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get additionalFund(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class SessionFacet extends ethereum.SmartContract {
  static bind(address: Address): SessionFacet {
    return new SessionFacet("SessionFacet", address);
  }

  isSessionLive(): boolean {
    let result = super.call("isSessionLive", "isSessionLive():(bool)", []);

    return result[0].toBoolean();
  }

  try_isSessionLive(): ethereum.CallResult<boolean> {
    let result = super.tryCall("isSessionLive", "isSessionLive():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  sessionRewardPerAma(sessionId_: Bytes): BigInt {
    let result = super.call(
      "sessionRewardPerAma",
      "sessionRewardPerAma(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(sessionId_)]
    );

    return result[0].toBigInt();
  }

  try_sessionRewardPerAma(sessionId_: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "sessionRewardPerAma",
      "sessionRewardPerAma(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(sessionId_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ClaimRewardLeftCall extends ethereum.Call {
  get inputs(): ClaimRewardLeftCall__Inputs {
    return new ClaimRewardLeftCall__Inputs(this);
  }

  get outputs(): ClaimRewardLeftCall__Outputs {
    return new ClaimRewardLeftCall__Outputs(this);
  }
}

export class ClaimRewardLeftCall__Inputs {
  _call: ClaimRewardLeftCall;

  constructor(call: ClaimRewardLeftCall) {
    this._call = call;
  }

  get sessionId_(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class ClaimRewardLeftCall__Outputs {
  _call: ClaimRewardLeftCall;

  constructor(call: ClaimRewardLeftCall) {
    this._call = call;
  }
}

export class CreateSessionCall extends ethereum.Call {
  get inputs(): CreateSessionCall__Inputs {
    return new CreateSessionCall__Inputs(this);
  }

  get outputs(): CreateSessionCall__Outputs {
    return new CreateSessionCall__Outputs(this);
  }
}

export class CreateSessionCall__Inputs {
  _call: CreateSessionCall;

  constructor(call: CreateSessionCall) {
    this._call = call;
  }

  get startTime_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get endTime_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get rewardPerAMA_(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get sessionHash_(): string {
    return this._call.inputValues[3].value.toString();
  }
}

export class CreateSessionCall__Outputs {
  _call: CreateSessionCall;

  constructor(call: CreateSessionCall) {
    this._call = call;
  }

  get value0(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class EndSessionCall extends ethereum.Call {
  get inputs(): EndSessionCall__Inputs {
    return new EndSessionCall__Inputs(this);
  }

  get outputs(): EndSessionCall__Outputs {
    return new EndSessionCall__Outputs(this);
  }
}

export class EndSessionCall__Inputs {
  _call: EndSessionCall;

  constructor(call: EndSessionCall) {
    this._call = call;
  }

  get sessionId_(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class EndSessionCall__Outputs {
  _call: EndSessionCall;

  constructor(call: EndSessionCall) {
    this._call = call;
  }
}

export class ExtendSessionCall extends ethereum.Call {
  get inputs(): ExtendSessionCall__Inputs {
    return new ExtendSessionCall__Inputs(this);
  }

  get outputs(): ExtendSessionCall__Outputs {
    return new ExtendSessionCall__Outputs(this);
  }
}

export class ExtendSessionCall__Inputs {
  _call: ExtendSessionCall;

  constructor(call: ExtendSessionCall) {
    this._call = call;
  }

  get sessionId_(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get additionalTime_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ExtendSessionCall__Outputs {
  _call: ExtendSessionCall;

  constructor(call: ExtendSessionCall) {
    this._call = call;
  }
}

export class InitSessionCall extends ethereum.Call {
  get inputs(): InitSessionCall__Inputs {
    return new InitSessionCall__Inputs(this);
  }

  get outputs(): InitSessionCall__Outputs {
    return new InitSessionCall__Outputs(this);
  }
}

export class InitSessionCall__Inputs {
  _call: InitSessionCall;

  constructor(call: InitSessionCall) {
    this._call = call;
  }

  get minSessionDuration_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get baseURI_(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class InitSessionCall__Outputs {
  _call: InitSessionCall;

  constructor(call: InitSessionCall) {
    this._call = call;
  }
}

export class SetSessionBaseURICall extends ethereum.Call {
  get inputs(): SetSessionBaseURICall__Inputs {
    return new SetSessionBaseURICall__Inputs(this);
  }

  get outputs(): SetSessionBaseURICall__Outputs {
    return new SetSessionBaseURICall__Outputs(this);
  }
}

export class SetSessionBaseURICall__Inputs {
  _call: SetSessionBaseURICall;

  constructor(call: SetSessionBaseURICall) {
    this._call = call;
  }

  get baseURI_(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class SetSessionBaseURICall__Outputs {
  _call: SetSessionBaseURICall;

  constructor(call: SetSessionBaseURICall) {
    this._call = call;
  }
}

export class TopUpSessionCall extends ethereum.Call {
  get inputs(): TopUpSessionCall__Inputs {
    return new TopUpSessionCall__Inputs(this);
  }

  get outputs(): TopUpSessionCall__Outputs {
    return new TopUpSessionCall__Outputs(this);
  }
}

export class TopUpSessionCall__Inputs {
  _call: TopUpSessionCall;

  constructor(call: TopUpSessionCall) {
    this._call = call;
  }

  get sessionId_(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class TopUpSessionCall__Outputs {
  _call: TopUpSessionCall;

  constructor(call: TopUpSessionCall) {
    this._call = call;
  }
}

export class UpdateSessionLinkCall extends ethereum.Call {
  get inputs(): UpdateSessionLinkCall__Inputs {
    return new UpdateSessionLinkCall__Inputs(this);
  }

  get outputs(): UpdateSessionLinkCall__Outputs {
    return new UpdateSessionLinkCall__Outputs(this);
  }
}

export class UpdateSessionLinkCall__Inputs {
  _call: UpdateSessionLinkCall;

  constructor(call: UpdateSessionLinkCall) {
    this._call = call;
  }

  get sessionId_(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get newHash_(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class UpdateSessionLinkCall__Outputs {
  _call: UpdateSessionLinkCall;

  constructor(call: UpdateSessionLinkCall) {
    this._call = call;
  }
}

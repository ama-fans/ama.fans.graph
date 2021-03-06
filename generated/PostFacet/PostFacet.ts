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

export class PostCreated extends ethereum.Event {
  get params(): PostCreated__Params {
    return new PostCreated__Params(this);
  }
}

export class PostCreated__Params {
  _event: PostCreated;

  constructor(event: PostCreated) {
    this._event = event;
  }

  get postId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get createdBy(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get link(): string {
    return this._event.parameters[3].value.toString();
  }
}

export class PostTipCreated extends ethereum.Event {
  get params(): PostTipCreated__Params {
    return new PostTipCreated__Params(this);
  }
}

export class PostTipCreated__Params {
  _event: PostTipCreated;

  constructor(event: PostTipCreated) {
    this._event = event;
  }

  get postId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get postTipId(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get createdBy(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class PostFacet__getPostResult {
  value0: BigInt;
  value1: BigInt;
  value2: Address;
  value3: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: Address, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromAddress(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }
}

export class PostFacet__getPostIdsResult {
  value0: Array<Bytes>;
  value1: BigInt;

  constructor(value0: Array<Bytes>, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromFixedBytesArray(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class PostFacet__getPostTipResult {
  value0: Address;
  value1: BigInt;
  value2: BigInt;
  value3: Bytes;

  constructor(value0: Address, value1: BigInt, value2: BigInt, value3: Bytes) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromFixedBytes(this.value3));
    return map;
  }
}

export class PostFacet__getPostTipIdsResult {
  value0: Array<Bytes>;
  value1: BigInt;

  constructor(value0: Array<Bytes>, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromFixedBytesArray(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class PostFacet__getTipIdsOnPostResult {
  value0: Array<Bytes>;
  value1: BigInt;

  constructor(value0: Array<Bytes>, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromFixedBytesArray(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class PostFacet extends ethereum.SmartContract {
  static bind(address: Address): PostFacet {
    return new PostFacet("PostFacet", address);
  }

  getPost(postId_: Bytes): PostFacet__getPostResult {
    let result = super.call(
      "getPost",
      "getPost(bytes32):(uint256,uint256,address,uint256)",
      [ethereum.Value.fromFixedBytes(postId_)]
    );

    return new PostFacet__getPostResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toAddress(),
      result[3].toBigInt()
    );
  }

  try_getPost(postId_: Bytes): ethereum.CallResult<PostFacet__getPostResult> {
    let result = super.tryCall(
      "getPost",
      "getPost(bytes32):(uint256,uint256,address,uint256)",
      [ethereum.Value.fromFixedBytes(postId_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PostFacet__getPostResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toAddress(),
        value[3].toBigInt()
      )
    );
  }

  getPostIds(skip_: BigInt, limit_: BigInt): PostFacet__getPostIdsResult {
    let result = super.call(
      "getPostIds",
      "getPostIds(uint256,uint256):(bytes32[],uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(skip_),
        ethereum.Value.fromUnsignedBigInt(limit_)
      ]
    );

    return new PostFacet__getPostIdsResult(
      result[0].toBytesArray(),
      result[1].toBigInt()
    );
  }

  try_getPostIds(
    skip_: BigInt,
    limit_: BigInt
  ): ethereum.CallResult<PostFacet__getPostIdsResult> {
    let result = super.tryCall(
      "getPostIds",
      "getPostIds(uint256,uint256):(bytes32[],uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(skip_),
        ethereum.Value.fromUnsignedBigInt(limit_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PostFacet__getPostIdsResult(
        value[0].toBytesArray(),
        value[1].toBigInt()
      )
    );
  }

  getPostMinimumBid(): BigInt {
    let result = super.call(
      "getPostMinimumBid",
      "getPostMinimumBid():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getPostMinimumBid(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getPostMinimumBid",
      "getPostMinimumBid():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getPostTip(postTipId_: Bytes): PostFacet__getPostTipResult {
    let result = super.call(
      "getPostTip",
      "getPostTip(bytes32):(address,uint256,uint256,bytes32)",
      [ethereum.Value.fromFixedBytes(postTipId_)]
    );

    return new PostFacet__getPostTipResult(
      result[0].toAddress(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBytes()
    );
  }

  try_getPostTip(
    postTipId_: Bytes
  ): ethereum.CallResult<PostFacet__getPostTipResult> {
    let result = super.tryCall(
      "getPostTip",
      "getPostTip(bytes32):(address,uint256,uint256,bytes32)",
      [ethereum.Value.fromFixedBytes(postTipId_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PostFacet__getPostTipResult(
        value[0].toAddress(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBytes()
      )
    );
  }

  getPostTipIds(skip_: BigInt, limit_: BigInt): PostFacet__getPostTipIdsResult {
    let result = super.call(
      "getPostTipIds",
      "getPostTipIds(uint256,uint256):(bytes32[],uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(skip_),
        ethereum.Value.fromUnsignedBigInt(limit_)
      ]
    );

    return new PostFacet__getPostTipIdsResult(
      result[0].toBytesArray(),
      result[1].toBigInt()
    );
  }

  try_getPostTipIds(
    skip_: BigInt,
    limit_: BigInt
  ): ethereum.CallResult<PostFacet__getPostTipIdsResult> {
    let result = super.tryCall(
      "getPostTipIds",
      "getPostTipIds(uint256,uint256):(bytes32[],uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(skip_),
        ethereum.Value.fromUnsignedBigInt(limit_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PostFacet__getPostTipIdsResult(
        value[0].toBytesArray(),
        value[1].toBigInt()
      )
    );
  }

  getTipIdsOnPost(
    postId_: Bytes,
    skip_: BigInt,
    limit_: BigInt
  ): PostFacet__getTipIdsOnPostResult {
    let result = super.call(
      "getTipIdsOnPost",
      "getTipIdsOnPost(bytes32,uint256,uint256):(bytes32[],uint256)",
      [
        ethereum.Value.fromFixedBytes(postId_),
        ethereum.Value.fromUnsignedBigInt(skip_),
        ethereum.Value.fromUnsignedBigInt(limit_)
      ]
    );

    return new PostFacet__getTipIdsOnPostResult(
      result[0].toBytesArray(),
      result[1].toBigInt()
    );
  }

  try_getTipIdsOnPost(
    postId_: Bytes,
    skip_: BigInt,
    limit_: BigInt
  ): ethereum.CallResult<PostFacet__getTipIdsOnPostResult> {
    let result = super.tryCall(
      "getTipIdsOnPost",
      "getTipIdsOnPost(bytes32,uint256,uint256):(bytes32[],uint256)",
      [
        ethereum.Value.fromFixedBytes(postId_),
        ethereum.Value.fromUnsignedBigInt(skip_),
        ethereum.Value.fromUnsignedBigInt(limit_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PostFacet__getTipIdsOnPostResult(
        value[0].toBytesArray(),
        value[1].toBigInt()
      )
    );
  }

  uri(contentHash_: string): string {
    let result = super.call("uri", "uri(string):(string)", [
      ethereum.Value.fromString(contentHash_)
    ]);

    return result[0].toString();
  }

  try_uri(contentHash_: string): ethereum.CallResult<string> {
    let result = super.tryCall("uri", "uri(string):(string)", [
      ethereum.Value.fromString(contentHash_)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class CreatePostCall extends ethereum.Call {
  get inputs(): CreatePostCall__Inputs {
    return new CreatePostCall__Inputs(this);
  }

  get outputs(): CreatePostCall__Outputs {
    return new CreatePostCall__Outputs(this);
  }
}

export class CreatePostCall__Inputs {
  _call: CreatePostCall;

  constructor(call: CreatePostCall) {
    this._call = call;
  }

  get postHash_(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class CreatePostCall__Outputs {
  _call: CreatePostCall;

  constructor(call: CreatePostCall) {
    this._call = call;
  }

  get value0(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class CreatePostTipCall extends ethereum.Call {
  get inputs(): CreatePostTipCall__Inputs {
    return new CreatePostTipCall__Inputs(this);
  }

  get outputs(): CreatePostTipCall__Outputs {
    return new CreatePostTipCall__Outputs(this);
  }
}

export class CreatePostTipCall__Inputs {
  _call: CreatePostTipCall;

  constructor(call: CreatePostTipCall) {
    this._call = call;
  }

  get postId_(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class CreatePostTipCall__Outputs {
  _call: CreatePostTipCall;

  constructor(call: CreatePostTipCall) {
    this._call = call;
  }
}

export class InitPostCall extends ethereum.Call {
  get inputs(): InitPostCall__Inputs {
    return new InitPostCall__Inputs(this);
  }

  get outputs(): InitPostCall__Outputs {
    return new InitPostCall__Outputs(this);
  }
}

export class InitPostCall__Inputs {
  _call: InitPostCall;

  constructor(call: InitPostCall) {
    this._call = call;
  }

  get postMinimumBid_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get baseURI_(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class InitPostCall__Outputs {
  _call: InitPostCall;

  constructor(call: InitPostCall) {
    this._call = call;
  }
}

export class SetPostBaseURICall extends ethereum.Call {
  get inputs(): SetPostBaseURICall__Inputs {
    return new SetPostBaseURICall__Inputs(this);
  }

  get outputs(): SetPostBaseURICall__Outputs {
    return new SetPostBaseURICall__Outputs(this);
  }
}

export class SetPostBaseURICall__Inputs {
  _call: SetPostBaseURICall;

  constructor(call: SetPostBaseURICall) {
    this._call = call;
  }

  get baseURI_(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class SetPostBaseURICall__Outputs {
  _call: SetPostBaseURICall;

  constructor(call: SetPostBaseURICall) {
    this._call = call;
  }
}

export class SetPostMinimumBidCall extends ethereum.Call {
  get inputs(): SetPostMinimumBidCall__Inputs {
    return new SetPostMinimumBidCall__Inputs(this);
  }

  get outputs(): SetPostMinimumBidCall__Outputs {
    return new SetPostMinimumBidCall__Outputs(this);
  }
}

export class SetPostMinimumBidCall__Inputs {
  _call: SetPostMinimumBidCall;

  constructor(call: SetPostMinimumBidCall) {
    this._call = call;
  }

  get postMinimumBid_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetPostMinimumBidCall__Outputs {
  _call: SetPostMinimumBidCall;

  constructor(call: SetPostMinimumBidCall) {
    this._call = call;
  }
}

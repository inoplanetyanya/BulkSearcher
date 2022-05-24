import { Injectable, OnInit } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { LeagueService } from '../league.service';
import { OptionsService } from './options.service';

export class Lot {
  private _seller: string = '';
  private _sellerAcc: string = '';
  private _maps: Array<Map> = [];
  private _totalPrice: number = 0;
  private optionService: OptionsService | undefined;
  private _clicked: boolean = false;

  public get seller(): string {
    return this._seller;
  }

  public set seller(value: string) {
    this._seller = value;
  }

  public get sellerAcc(): string {
    return this._sellerAcc;
  }

  public set sellerAcc(value: string) {
    this._sellerAcc = value;
  }

  public get maps(): Array<Map> {
    return [...this._maps];
  }

  public mapAdd(map: Map) {
    this._maps.push(map);
    this._totalPrice += map.price;
  }

  public get mapsCount(): number {
    return this._maps.length;
  }

  public get totalPrice(): number {
    return this._totalPrice;
  }

  public get pickedPrice(): number {
    let r = 0;
    this._maps
      .filter((el) => el.picked)
      .map(function (el) {
        r += el.price;
      });
    return r;
  }

  public get pickedCount(): number {
    return this._maps.filter((el) => el.picked).length;
  }

  public get clicked(): boolean {
    return this._clicked;
  }

  public set clicked(value: boolean) {
    this._clicked = value;
  } 

  private findUniqMaps(): Map[] {
    let mapsUniq: Map[] = [];

    this._maps.map(function (m) {
      if (
        !mapsUniq.find(
          (mu) => mu.map === m.map && mu.price === m.price && mu.tier === m.tier
        )
      ) {
        mapsUniq.push(m);
      }
    });

    return mapsUniq;
  }

  public mapMinus(index: number) {
    let mapsUniq: Map[] = this.findUniqMaps();
    let m = this._maps.find(
      (el) =>
        el.map === mapsUniq[index].map &&
        el.price === mapsUniq[index].price &&
        el.tier === mapsUniq[index].tier &&
        el.picked
    );
    if (m) m.picked = false;
  }

  public mapPlus(index: number) {
    let mapsUniq: Map[] = this.findUniqMaps();
    let m = this._maps.find(
      (el) =>
        el.map === mapsUniq[index].map &&
        el.price === mapsUniq[index].price &&
        el.tier === mapsUniq[index].tier &&
        !el.picked
    );
    if (m) m.picked = true;
  }

  public mapsCheck(index: number): boolean {
    let mapsUniq: Map[] = this.findUniqMaps();
    let m = this._maps.find(
      (el) =>
        el.map === mapsUniq[index].map &&
        el.price === mapsUniq[index].price &&
        el.tier === mapsUniq[index].tier &&
        el.picked
    );
    const result = m !== undefined ? true : false;
    // console.log(result);
    return result;
  }

  public get mapsReduced(): string[] {
    let result: string[] = [];
    let mapsUniq: Map[] = this.findUniqMaps();

    const that = this;

    mapsUniq.map(function (mu) {
      let muc = that._maps.filter(
        (m) =>
          m.map === mu.map &&
          m.price === mu.price &&
          m.tier === mu.tier &&
          m.picked
      ).length;
      let total = that._maps.filter(
        (m) => m.map === mu.map && m.price === mu.price && m.tier === mu.tier
      ).length;
      let mstr = `${mu.map}${
        ' (T' +
        mu.tier +
        ')' +
        ' - ' +
        mu.price +
        'c x' +
        muc +
        '/' +
        total +
        ' - ' +
        Number((mu.price * muc).toFixed(1)) +
        'c'
      }`;
      result.push(mstr);
    });

    return result;
  }

  private get mapsReducedBuy(): string[] {
    let result: string[] = [];
    let mapsUniq: Map[] = this.findUniqMaps();

    const that = this;

    mapsUniq.map(function (mu) {
      let muc = that._maps.filter(
        (m) =>
          m.map === mu.map &&
          m.price === mu.price &&
          m.tier === mu.tier &&
          m.picked
      ).length;
      let mstr = '';
      if (muc > 0)
        mstr = `${mu.map}${
          muc > 1
            ? ' (T' +
              mu.tier +
              ')' +
              ' - ' +
              mu.price +
              'c x' +
              muc +
              ' - ' +
              Number((mu.price * muc).toFixed(1)) +
              'c'
            : ' (T' + mu.tier + ')' + ' - ' + mu.price + 'c'
        }`;
      result.push(mstr);
    });

    return result;
  }

  private tmin: any;
  private tmax: any;

  public get buyMessage(): string {
    let ravaged =
      this.optionService?.options.blightType === 'uberblighted'
        ? '-Ravaged'
        : '';
    let tier = this.tmin === this.tmax ? `Tier ${this.tmin}` : `Tier ${this.tmin}-${this.tmax}`;
    return `@${
      this._seller
    } Hi, I would like to buy your non-corrupted and non-annoited ${tier} Blighted${ravaged} Maps: ${this.mapsReducedBuy.filter(el => el !== '').join(
      '; '
    )}. Total ${this.pickedCount} maps for ${this.pickedPrice} chaos`;
  }

  public get pricePerMap(): number {
    return Number((this.mapsCount / this.totalPrice).toFixed());
  }

  constructor(optionService?: OptionsService) {
    if (optionService) this.optionService = optionService;
    this.tmin = this.optionService?.options.tierMin;
    this.tmax = this.optionService?.options.tierMax;
    if (!this.tmax) this.tmax = 16;
    if (this.tmax && !this.tmin) this.tmin = 13;
  }
}

export class Map {
  private _seller: string;
  private _map: string;
  private _tier: number;
  private _price: number;
  private _picked: boolean;
  private _sellerAcc: string;

  public get sellerAcc(): string {
    return this._sellerAcc;
  }

  public get seller(): string {
    return this._seller;
  }

  public get map(): string {
    return this._map;
  }

  public get tier(): number {
    return this._tier;
  }

  public get price(): number {
    return this._price;
  }

  public get picked(): boolean {
    return this._picked;
  }

  public set picked(value: boolean) {
    this._picked = value;
  }

  public pickToggle() {
    this._picked = !this._picked;
  }

  constructor(seller: string, map: string, tier: number, price: number, sellerAcc: string) {
    this._seller = seller;
    this._map = map;
    this._tier = tier;
    this._price = price;
    this._picked = true;
    this._sellerAcc = sellerAcc;
  }
}

@Injectable({ providedIn: 'root' })
export class RequestService implements OnInit {
  MAGIC_STRING =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36';

  delaysGet: Promise<any>[] = [];
  delaysPost: Promise<any>[] = [];

  private generateResult() {
    let test_lot1 = new Lot();
    test_lot1.seller = 'Test_Seller1';
    test_lot1.sellerAcc = 'TestAcc1';
    test_lot1.mapAdd(new Map('Test_Seller1', 'Test_Map1', 13, 15, 'TestAcc1'));
    test_lot1.mapAdd(new Map('Test_Seller1', 'Test_Map2', 14, 18, 'TestAcc1'));
    test_lot1.mapAdd(new Map('Test_Seller1', 'Test_Map2', 14, 18, 'TestAcc1'));

    let test_lot2 = new Lot();
    test_lot2.seller = 'Test_Seller2';
    test_lot2.sellerAcc = 'TestAcc2';
    test_lot2.mapAdd(new Map('Test_Seller2', 'Test_Map8', 13, 19, 'TestAcc2'));
    test_lot2.mapAdd(new Map('Test_Seller2', 'Test_Map8', 13, 19, 'TestAcc2'));
    test_lot2.mapAdd(new Map('Test_Seller2', 'Test_Map8', 15, 25, 'TestAcc2'));
    test_lot2.mapAdd(new Map('Test_Seller2', 'Test_Map8', 15, 25, 'TestAcc2'));
    test_lot2.mapAdd(new Map('Test_Seller2', 'Test_Map8', 15, 25, 'TestAcc2'));
    test_lot2.mapAdd(new Map('Test_Seller2', 'Test_Map8', 15, 25, 'TestAcc2'));

    return [test_lot1, test_lot2];
  }

  public lastResult: any[] = [];
  // public lastResult: any[] = this.generateResult();


  processing: boolean = false;

  tierMin = 1;
  tierMax = 0;

  async search() {
    this.processing = true;

    let postResult;
    let getResult;
    let lotCollection: any[] = [];
    let tmp;

    let tierMin =
      this.optionsService.options.tierMin === null
        ? 13
        : this.optionsService.options.tierMin;
    let tierMax =
      this.optionsService.options.tierMax === null
        ? 16
        : this.optionsService.options.tierMax;

    this.tierMin = tierMin;
    this.tierMax = tierMax;
    try {
      for (let i = this.tierMin; i <= this.tierMax; i++) {
        postResult = await this.makePOST(this.leagueService.selectedLeague, i);
        getResult = await this.makeGET(postResult['result'], postResult['id']);
        tmp = await this.processGetResult(getResult);
        if (tmp) lotCollection.push(...tmp);
      }
      let stockMin =
        this.optionsService.options.stockMin === null
          ? 1
          : this.optionsService.options.stockMin;
      lotCollection = this.processLotCollection(lotCollection)
        .filter((el) => el.mapsCount >= stockMin)
        .sort((a, b) => (a.pricePerMap > b.pricePerMap ? 1 : -1));
    } catch (e) {
      // console.log(e);
    }
    this.lastResult = lotCollection;
    // console.log(lotCollection);
    this.processing = false;
  }

  processLotCollection(lots: any) {
    const that = this;
    let sellers: any[] = [];
    let result: Lot[] = [];
    let lotsCopy = [...lots];
    lotsCopy.sort((el1, el2) => (el1.seller > el2.seller ? 1 : -1));

    lotsCopy.map(function (el: any) {
      if (!sellers.includes(el.seller)) {
        sellers.push(el.seller);
      }
    });

    sellers.map(function (el: any) {
      let lot = new Lot(that.optionsService);
      lot.seller = el;
      let maps = lotsCopy.filter((m) => m.seller === el);
      lot.sellerAcc = maps[0].sellerAcc;
      maps.map(function (m) {
        lot.mapAdd(m);
      });
      lotsCopy.splice(0, maps.length);
      result.push(lot);
    });

    return result;
  }

  async processGetResult(getResult: any) {
    if (getResult === undefined) return;
    let result = [];
    for (let i = 0; i < getResult.length; i++) {
      let tmp = await this.processGetResultBlock(getResult[i]['result']);
      if (tmp) result.push(...tmp);
    }

    return result;
  }

  async processGetResultBlock(block: any) {
    if (block === undefined) return;
    let result = [];
    for (let i = 0; i < block.length; i++) {
      result.push(await this.processLot(block[i]));
    }
    return result;
  }

  async processLot(lot: any) {
    if (lot === null) return;
    const seller = lot['listing']['account']['lastCharacterName'];
    const price = lot['listing']['price']['amount'];
    const currency = lot['listing']['price']['currency'];
    const map = lot['item']['baseType']
      .replace(/Blight.*?\s/g, '')
      .replace(' Map', '');
    const tier = lot['item']['properties'][0]['values'][0][0];
    const sellerAcc = lot['listing']['account']['name'];

    return new Map(seller, map, tier, price, sellerAcc);
  }

  async createPostBody(tier: number) {
    const result = {
      query: {
        status: {
          option: 'online',
        },
        stats: [
          {
            type: 'and',
            filters: [],
          },
        ],
        filters: {
          map_filters: {
            filters: {
              map_uberblighted: {
                option:
                  this.optionsService.options.blightType === 'uberblighted'
                    ? 'true'
                    : 'false',
              },
              map_blighted: {
                option:
                  this.optionsService.options.blightType === 'blighted'
                    ? 'true'
                    : 'false',
              },
              map_tier: {
                min: tier,
                max: tier,
              },
            },
          },
          trade_filters: {
            filters: {
              price: {
                min:
                  this.optionsService.options.priceMin === null
                    ? 0.1
                    : this.optionsService.options.priceMin,
                max:
                  this.optionsService.options.priceMax === null
                    ? 99999
                    : this.optionsService.options.priceMax,
              },
            },
          },
          misc_filters: {
            filters: {
              corrupted: {
                option: 'false',
              },
              enchanted: {
                option: 'false',
              },
              split: {
                option: 'false',
              },
              mirrored: {
                option: 'false',
              },
              crafted: {
                option: 'false',
              },
              fractured_item: {
                option: 'false',
              },
            },
          },
        },
      },
      sort: {
        price: 'asc',
      },
    };
    return result;
  }

  async makePOST(league: string, tier: number) {
    await Promise.all(this.delaysPost);
    this.delaysPost = [];
    let postBody = await this.createPostBody(tier);
    const response = await fetch(
      `https://www.pathofexile.com/api/trade/search/${league}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'User-Agent': `${this.MAGIC_STRING}`,
        },
        body: JSON.stringify(postBody),
      }
    );
    const limit = await response.headers.get('x-rate-limit-ip');
    const state = await response.headers.get('x-rate-limit-ip-state');
    // console.log(
    //   `Got response in POST method.\nlimit:\t${
    //     limit === null ? '' : limit.replace(/\,/g, ',\t')
    //   }\nstate:\t${state === null ? '' : state.replace(/\,/g, ',\t')}`
    // );
    await this.limitRequest(
      limit === null ? '' : limit,
      state === null ? '' : state,
      'POST'
    );
    let r = await response.json();
    return r;
  }

  async makeGET(requestIds: string[], queryId: string) {
    if (requestIds === undefined || queryId === undefined) return;
    let result = [];
    let splisedReqIds = requestIds.splice(0, 9);
    let response;
    while (splisedReqIds.length > 0) {
      let stringInjection = splisedReqIds.join(',') + `?query=${queryId}`;
      await Promise.all(this.delaysGet);
      this.delaysGet = [];
      response = await fetch(
        `https://www.pathofexile.com/api/trade/fetch/${stringInjection}`,
        {
          method: 'GET',
          headers: {
            'User-Agent': `${this.MAGIC_STRING}`,
          },
        }
      );
      result.push(await response.json());
      const limit = await response.headers.get('x-rate-limit-ip');
      const state = await response.headers.get('x-rate-limit-ip-state');
      // console.log(
      //   `Got response in GET method.\nlimit:\t${
      //     limit === null ? '' : limit.replace(/\,/g, ',\t')
      //   }\nstate:\t${state === null ? '' : state.replace(/\,/g, ',\t')}`
      // );
      await this.limitRequest(
        limit === null ? '' : limit,
        state === null ? '' : state,
        'GET'
      );
      splisedReqIds = requestIds.splice(0, 9);
    }
    return result;
  }

  limitRequest(limit: string, state: string, getOrPost: string) {
    const tmp = limit.split(',');
    const limits = [];
    for (let i = 0; i < tmp.length; i++) {
      limits.push(tmp[i].split(':')[0]);
    }

    const tmp2 = state.split(',');
    const states = [];
    for (let i = 0; i < tmp2.length; i++) {
      states.push(tmp2[i].split(':')[0]);
    }

    for (let i = 0; i < limits.length; i++) {
      if (states[i] === limits[i]) {
        if (getOrPost === 'POST') {
          this.delaysPost.push(this.getDelay(Number(tmp[i].split(':')[1])));
        } else if (getOrPost === 'GET') {
          this.delaysGet.push(this.getDelay(Number(tmp[i].split(':')[1])));
        }
      }
    }
  }

  getDelay(seconds: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('OK');
      }, seconds * 1000);
    });
  }

  ngOnInit(): void {}

  constructor(private optionsService: OptionsService, private leagueService: LeagueService) {}
}

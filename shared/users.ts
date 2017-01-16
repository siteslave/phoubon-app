
export interface IUser {
  id: number;
  name: string;
  telephone?: string;
}

export interface iGroups extends IUser {
  getName?: () => {},
  rights?: Array<any>;
}

export class Hello {
  public firstName: string = 'Satit';
  private lastName: string = 'Rianpit';

  public getName() {
    return this.firstName + ' ' + this.lastName;
    // Satit Rianpit
  }
}

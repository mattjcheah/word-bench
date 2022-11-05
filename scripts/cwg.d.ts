declare module "cwg" {
  export type Crossword = {
    height: number;
    width: number;
    positionObjArr: {
      wordStr: string;
      xNum: number;
      yNum: number;
      isHorizon: boolean;
    }[];
  };

  declare const cwg: (wordSet: string[]) => Crossword;
  export default cwg;
}

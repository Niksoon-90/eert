export interface ISelectMethodUsers {
  id: number;
  type: string;
  name: string;
}
export interface IHorizonforecast {
  name: number;
}
export interface ICalculatingPredictiveRegression{
  id?: number,
  sessionId?: number,
  cargoGroup?: string,
  shipmentType?: string,
  groupVolumesByYears?: {},
  macroIndexesByYears?: {},
  forecastValues?: IfFrecastValues[],
  regressionParameters?: number[],
  primary?: boolean
}
export interface IfFrecastValues {
  cargoGroup?: string
  forecastType?: string
  id?: number
  sessionId?: number
  shipmentType?: string
  value?: number
  year?: number
}

export interface ICargoNci {
  id?: number,
  name?: string,
  initialVerificationCoeff?: number

}export interface IInfluenceNci {
  id?: number,
  name?: string,
  weight?: number
}

export interface ICargoOwnerInfluenceFactor {
  cargoOwnerId?: number,
  cargoOwnerName?: string,
  id?: number,
  influenceFactorId?: number,
  influenceFactorName?: string,
  koef?: number
}

export interface IStationNci {
  id?: number,
  name?: string,
  code?: string
  border?: string,
  ferry?: string,
  land?: string,
  road?: string,
  subjectGvc?: string,
  transmissionPoint?: string,
  type?: string
}
export interface IDorogyNci {
  id?: number,
  name?: string
  code?: number,
  shortname?: string
}
export interface ICargoGroupNci {
  id: number,
  name: string
}
export interface ISubjectNci {
  id: number,
  name: string
}

export interface IShipmentTypNci {
  id: number,
  name: string
}

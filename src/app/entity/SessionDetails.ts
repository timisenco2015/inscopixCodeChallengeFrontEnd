export class SessionDetails
{
    animalDateOfBirth:string ;
	animalID:string;
	animalSex:string;
	animalSpecies: string;
	animalWeight:string;
	experimenterName:string;
	microscopeEXLEDPower:any;
	microscopeOGLEDPower:any ;
	samplingRate:number;
	sessionId:string ;
	recordingStartTime:string;
	acquisitionSWVersion:string;
    constructor()
    {

    }
	
	public getAcquisitionSWVersion() 
	{
		return this.acquisitionSWVersion;
	}

	public setAcquisitionSWVersion(acquisitionSWVersion:string) 
	{
		this.acquisitionSWVersion = acquisitionSWVersion;
	}


	public getAnimalDateOfBirth() 
	{
		return this.animalDateOfBirth;
	}

	public setAnimalDateOfBirth(animalDateOfBirth:string) 
	{
		this.animalDateOfBirth = animalDateOfBirth;
	}

	public getAnimalID() 
	{
		return this.animalID;
	}


	public setAnimalID(animalID:string) 
	{
		this.animalID = animalID;
	}


	public getAnimalSex() 
	{
		return this.animalSex;
	}

	public setAnimalSex(animalSex:string) 
	{
		this.animalSex = animalSex;
	}


	public getAnimalSpecies() 
	{
		return this.animalSpecies;
	}


	public setAnimalSpecies(animalSpecies:string) 
	{
		this.animalSpecies = animalSpecies;
	}


	public getAnimalWeight() 
	{
		return this.animalWeight;
	}


	public setAnimalWeight(animalWeight:string) 
	{
		this.animalWeight = animalWeight;
	}


	public getExperimenterName() 
	{
		return this.experimenterName;
	}


	public setExperimenterName(experimenterName:string) 
	{
		this.experimenterName = experimenterName;
	}


	public getMicroscopeEXLEDPower() 
	{
		return this.microscopeEXLEDPower;
	}


	public setMicroscopeEXLEDPower(microscopeEXLEDPower:any) 
	{
		this.microscopeEXLEDPower = microscopeEXLEDPower;
	}


	public getMicroscopeOGLEDPower() 
	{
		return this.microscopeOGLEDPower;
	}


	public setMicroscopeOGLEDPower(microscopeOGLEDPower:any) 
	{
		this.microscopeOGLEDPower = microscopeOGLEDPower;
	}


	public getSamplingRate() 
	{
		return this.samplingRate;
	}


	public setSamplingRate(samplingRate:number) 
	{
		this.samplingRate = samplingRate;
	}


	public getSessionId() 
	{
		this.sessionId;
	}


	public setSessionId(sessionID:string) 
	{
		this.sessionId = sessionID;
	}


	public getRecordingStartTime() 
	{
		return this.recordingStartTime;
	}


	public setRecordingStartTime(recordingStartTime:string) 
	{
		this.recordingStartTime = recordingStartTime;
	}

	
	
}

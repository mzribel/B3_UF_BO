// Cat related interfaces
export interface Coat {
    colorId: number;
    patternId?: number;
    effectId?: number;
    whiteMarkingId?: number;
    breedId?: string;
}

export interface Cat {
    id: number;
    name: string;
    surname?: string;
    isFemale?: boolean;
    coat?: {
        breed: string;
        color: string;
        code: string;
        eyes?: string | null;
        polydactylism?: string | null;
    };
    litter?: {
        litterId: number;
        birthDate: string;
        sireId: number;
        damId: number;
        originBreeder: {
            id: number;
            affix: string;
            isAffixSuffix: boolean;
        };
    };
    pedigreeNumber?: string;
    identificationNumber?: string;
    isDeceased?: boolean;
    deceasedDate?: string | null;
    isNeutered?: boolean;
    neuteredDate?: string | null;
    notes?: string | null;
    createdByCatteryId: number;
}

export interface NewCat {
    name: string;
    surname?: string;
    isFemale?: boolean;
    coat?: Coat;
    litter?: {
        litterId: number;
        birthDate: string;
        sireId: number;
        damId: number;
        originBreeder: {
            id: number;
            affix: string;
            isAffixSuffix: boolean;
        };
    };
    pedigreeNumber?: string;
    identificationNumber?: string;
    isDeceased?: boolean;
    deceasedDate?: string | null;
    isNeutered?: boolean;
    neuteredDate?: string | null;
    notes?: string | null;
    createdByCatteryId: number;
}

export interface CatDetails extends Cat {
    // Ajoutez ici des propriétés supplémentaires si nécessaire
}


// User related interfaces
export interface User {
    id: number;
    email: string;
    displayName: string;
    admin: boolean;
}

export interface NewUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

// Breeder related interfaces
export interface Breeder {
    id: number;
    name: string;
    siret: string;
    affix: string;
    isAffixPrefix: boolean;
    ownerId: number;
    addressId: number;
    createdByCatteryId: number;
    isActive: boolean;
    isDerogatory: boolean;
}

export interface NewBreeder {
    catteryId?: number;
    name: string;
    siret: string;
    affix: string;
    isAffixPrefix: boolean;
    isActive?: boolean;
    isDerogatory?: boolean;
}

export interface UpdateBreeder extends NewBreeder {
    id?: number;
}

export interface Address {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
}

// Cattery related interfaces
export interface Cattery {
    id: number;
    createdByUser: User;
    linkedBreeder: Breeder;
    members: User[];

}

export interface NewCattery {
    name: string;
    breederId?: number;
}

export interface UserCatteries {
    user: User;
    catteries: Cattery[];
}

// Health Log related interfaces
export interface HealthLog {
    id: number;
    date: string;
    description: string;
    catId: number;
    type: string;
}

export interface NewHealthLog {
    date: string;
    description: string;
    catId: number;
    type: string;
}

export interface KittenHealthLog {
    id: number;
    healthLogId: number;
    weight: number;
    height?: number;
    length?: number;
}

export interface NewKittenHealthLog {
    healthLogId: number;
    weight: number;
    height?: number;
    length?: number;
}

export interface GestationHealthLog {
    id: number;
    healthLogId: number;
    gestationId: number;
    gestationDay: number;
    notes?: string;
}

export interface NewGestationHealthLog {
    healthLogId: number;
    gestationId: number;
    gestationDay: number;
    notes?: string;
}

// LOOF Characteristic interfaces
export interface Breed {
    id: number;
    name: string;
    details?: string;
    code: string;
}

export interface NewBreed {
    name: string;
    details?: string;
    code: string;
}

export interface CoatColor {
    id: number;
    name: string;
    code: string;
}

export interface NewCoatColor {
    name: string;
    code: string;
}

export interface CoatEffect {
    id: number;
    name: string;
    code: string;
}

export interface NewCoatEffect {
    name: string;
    code: string;
}

export interface CoatPattern {
    id: number;
    name: string;
    code: string;
}

export interface NewCoatPattern {
    name: string;
    code: string;
}

export interface CoatWhiteMarking {
    id: number;
    name: string;
    code: string;
}

export interface NewCoatWhiteMarking {
    name: string;
    code: string;
}

export interface PolyType {
    id: number;
    name: string;
    code: string;
}

export interface NewPolyType {
    name: string;
    code: string;
}

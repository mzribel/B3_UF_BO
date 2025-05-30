import axios from 'axios';
import type {
  Cat,
  NewCat,
  CatDetails,
  Breeder,
  NewBreeder,
  UpdateBreeder,
  Cattery,
  NewCattery,
  HealthLog,
  NewHealthLog,
  KittenHealthLog,
  NewKittenHealthLog,
  GestationHealthLog,
  NewGestationHealthLog,
  Breed,
  CoatColor,
  CoatEffect,
  CoatPattern,
  CoatWhiteMarking,
  PolyType,
  NewBreed,
  NewCoatColor,
  NewCoatEffect,
  NewCoatPattern,
  NewCoatWhiteMarking,
  NewPolyType,
  LoginCredentials,
  AuthResponse, NewUser, User
} from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const catApi = {
  getAllCats: () => api.get<Cat[]>('/cats'),
  getCat: (catId: number) => api.get<CatDetails>(`/cats/${catId}`),
  createCat: (catteryId: number, catData: NewCat) => api.post<CatDetails>(`/catteries/${catteryId}/cats`, catData),
  updateCat: (id: number, catData: NewCat) => api.put<Cat>(`/cats/${id}`, catData),
  deleteCat: (id: number) => api.delete(`/cats/${id}`),
  getCatteryCats: (catteryId: number) => api.get<Cat[]>(`/catteries/${catteryId}/cats`)
};

export const userApi = {
  getAllUsers: () => api.get<User[]>('/users'),
  getUserById: (userId: number) => api.get<User>(`/users/${userId}`)
};

export const authApi = {
  register: (userData: NewUser) => api.post<AuthResponse>('/auth/register', userData),
  login: (credentials: LoginCredentials) => api.post<AuthResponse>('/auth/login', credentials)
};

export const breederApi = {
  getAllBreeders: () => api.get<Breeder[]>('/breeders'),
  getBreederById: (id: number) => api.get<Breeder>(`/breeders/${id}`),
  deleteBreederById: (id: number) => api.delete(`/breeders/${id}`),
  getCatteryBreeder: (catteryId: number) => api.get<Breeder>(`/catteries/${catteryId}/breeder`),
  updateCatteryBreeder: (catteryId: number, breederData: UpdateBreeder) => 
    api.put<Breeder>(`/catteries/${catteryId}/breeder`, breederData),
  getAllContactBreeders: (catteryId: number) => 
    api.get<Breeder[]>(`/catteries/${catteryId}/contacts/breeders`),
  createContactBreeder: (catteryId: number, breederData: NewBreeder) => 
    api.post<Breeder>(`/catteries/${catteryId}/contacts/breeders`, breederData),
  updateContactBreeder: (catteryId: number, breederId: number, breederData: NewBreeder) => 
    api.put<Breeder>(`/catteries/${catteryId}/contacts/breeders/${breederId}`, breederData),
  deleteContactBreeder: (catteryId: number, breederId: number) => 
    api.delete(`/catteries/${catteryId}/contacts/breeders/${breederId}`)
};

export const catteryApi = {
  getAllCatteries: () => api.get<Cattery[]>('/catteries'),
  createCattery: (catteryData: NewCattery) => api.post<Cattery>('/catteries', catteryData),
  getCatteryById: (id: number) => api.get<Cattery>(`/catteries/${id}`),
  deleteCatteryById: (id: number) => api.delete(`/catteries/${id}`),
  addUserToCattery: (catteryId: number, userData: { userId: number }) => 
    api.post(`/catteries/${catteryId}/members`, userData),
  removeUserFromCattery: (catteryId: number, userId: number) => 
    api.delete(`/catteries/${catteryId}/members/${userId}`),
  getUserCatteries: (userId: number) => api.get(`/users/${userId}/catteries`)
};

export const healthLogApi = {
  getAllHealthLogs: () => api.get<HealthLog[]>('/health-logs'),
  getHealthLogById: (id: number) => api.get<HealthLog>(`/health-logs/${id}`),
  getHealthLogsByCatId: (catId: number) => api.get<HealthLog[]>(`/cats/${catId}/health-logs`),
  createHealthLog: (healthLogData: NewHealthLog) => api.post<HealthLog>('/health-logs', healthLogData),
  updateHealthLog: (id: number, healthLogData: NewHealthLog) => 
    api.put<HealthLog>(`/health-logs/${id}`, healthLogData),
  deleteHealthLog: (id: number) => api.delete(`/health-logs/${id}`),

  getKittenHealthLogById: (id: number) => api.get<KittenHealthLog>(`/kitten-health-logs/${id}`),
  getKittenHealthLogByHealthLogId: (healthLogId: number) => 
    api.get<KittenHealthLog>(`/health-logs/${healthLogId}/kitten-health-log`),
  createKittenHealthLog: (kittenHealthLogData: NewKittenHealthLog) => 
    api.post<KittenHealthLog>('/kitten-health-logs', kittenHealthLogData),
  updateKittenHealthLog: (id: number, kittenHealthLogData: NewKittenHealthLog) => 
    api.put<KittenHealthLog>(`/kitten-health-logs/${id}`, kittenHealthLogData),
  deleteKittenHealthLog: (id: number) => api.delete(`/kitten-health-logs/${id}`),

  getGestationHealthLogById: (id: number) => api.get<GestationHealthLog>(`/gestation-health-logs/${id}`),
  getGestationHealthLogsByGestationId: (gestationId: number) => 
    api.get<GestationHealthLog[]>(`/gestations/${gestationId}/health-logs`),
  getGestationHealthLogByHealthLogId: (healthLogId: number) => 
    api.get<GestationHealthLog>(`/health-logs/${healthLogId}/gestation-health-log`),
  createGestationHealthLog: (gestationHealthLogData: NewGestationHealthLog) => 
    api.post<GestationHealthLog>('/gestation-health-logs', gestationHealthLogData),
  updateGestationHealthLog: (id: number, gestationHealthLogData: NewGestationHealthLog) => 
    api.put<GestationHealthLog>(`/gestation-health-logs/${id}`, gestationHealthLogData),
  deleteGestationHealthLog: (id: number) => api.delete(`/gestation-health-logs/${id}`)
};

export const breedApi = {
  getAllBreeds: () => api.get<Breed[]>('/loof/characteristics/breeds'),
  getBreedById: (id: number) => api.get<Breed>(`/loof/characteristics/breeds/${id}`),
  createBreed: (breedData: NewBreed) => api.post<Breed>('/loof/characteristics/breeds', breedData),
  updateBreed: (id: number, breedData: NewBreed) => api.put<Breed>(`/loof/characteristics/breeds/${id}`, breedData),
  deleteBreed: (id: number) => api.delete(`/loof/characteristics/breeds/${id}`)
};

export const coatColorApi = {
  getAllCoatColors: () => api.get<CoatColor[]>('/loof/characteristics/coat-colors'),
  getCoatColorById: (id: number) => api.get<CoatColor>(`/loof/characteristics/coat-colors/${id}`),
  createCoatColor: (colorData: NewCoatColor) => api.post<CoatColor>('/loof/characteristics/coat-colors', colorData),
  updateCoatColor: (id: number, colorData: NewCoatColor) => api.put<CoatColor>(`/loof/characteristics/coat-colors/${id}`, colorData),
  deleteCoatColor: (id: number) => api.delete(`/loof/characteristics/coat-colors/${id}`)
};

export const coatEffectApi = {
  getAllCoatEffects: () => api.get<CoatEffect[]>('/loof/characteristics/coat-effects'),
  getCoatEffectById: (id: number) => api.get<CoatEffect>(`/loof/characteristics/coat-effects/${id}`),
  createCoatEffect: (effectData: NewCoatEffect) => api.post<CoatEffect>('/loof/characteristics/coat-effects', effectData),
  updateCoatEffect: (id: number, effectData: NewCoatEffect) => api.put<CoatEffect>(`/loof/characteristics/coat-effects/${id}`, effectData),
  deleteCoatEffect: (id: number) => api.delete(`/loof/characteristics/coat-effects/${id}`)
};

export const coatPatternApi = {
  getAllCoatPatterns: () => api.get<CoatPattern[]>('/loof/characteristics/coat-patterns'),
  getCoatPatternById: (id: number) => api.get<CoatPattern>(`/loof/characteristics/coat-patterns/${id}`),
  createCoatPattern: (patternData: NewCoatPattern) => api.post<CoatPattern>('/loof/characteristics/coat-patterns', patternData),
  updateCoatPattern: (id: number, patternData: NewCoatPattern) => api.put<CoatPattern>(`/loof/characteristics/coat-patterns/${id}`, patternData),
  deleteCoatPattern: (id: number) => api.delete(`/loof/characteristics/coat-patterns/${id}`)
};

export const coatWhiteMarkingApi = {
  getAllCoatWhiteMarkings: () => api.get<CoatWhiteMarking[]>('/loof/characteristics/coat-white-markings'),
  getCoatWhiteMarkingById: (id: number) => api.get<CoatWhiteMarking>(`/loof/characteristics/coat-white-markings/${id}`),
  createCoatWhiteMarking: (markingData: NewCoatWhiteMarking) => api.post<CoatWhiteMarking>('/loof/characteristics/coat-white-markings', markingData),
  updateCoatWhiteMarking: (id: number, markingData: NewCoatWhiteMarking) => api.put<CoatWhiteMarking>(`/loof/characteristics/coat-white-markings/${id}`, markingData),
  deleteCoatWhiteMarking: (id: number) => api.delete(`/loof/characteristics/coat-white-markings/${id}`)
};

export const polyTypeApi = {
  getAllPolyTypes: () => api.get<PolyType[]>('/loof/characteristics/poly-types'),
  getPolyTypeById: (id: number) => api.get<PolyType>(`/loof/characteristics/poly-types/${id}`),
  createPolyType: (polyTypeData: NewPolyType) => api.post<PolyType>('/loof/characteristics/poly-types', polyTypeData),
  updatePolyType: (id: number, polyTypeData: NewPolyType) => api.put<PolyType>(`/loof/characteristics/poly-types/${id}`, polyTypeData),
  deletePolyType: (id: number) => api.delete(`/loof/characteristics/poly-types/${id}`)
};

export default api;

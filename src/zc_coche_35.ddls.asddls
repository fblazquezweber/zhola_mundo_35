@Metadata.allowExtensions: true
@EndUserText.label: '###GENERATED Core Data Service Entity'
@AccessControl.authorizationCheck: #CHECK
define root view entity ZC_COCHE_35
  provider contract TRANSACTIONAL_QUERY
  as projection on ZR_COCHE_35
{
  key IdCoche,
  key IdClienteCoch,
  Marca,
  Modelo,
  FechMatric,
  Bastidor,
  UserCreate,
  AbpLocinstLastchangeTstmp,
  AbpLocinstLastchangeUtcl,
  UserLastChange,
  AbpLastchangeTstmpl,
  AbpLastchangeUtcl
  
}

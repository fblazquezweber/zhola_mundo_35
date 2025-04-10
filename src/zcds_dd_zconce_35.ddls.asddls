@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Data definition de ZCONCE_35'
@Metadata.ignorePropagatedAnnotations: true
@ObjectModel.usageType:{
    serviceQuality: #X,
    sizeCategory: #S,
    dataClass: #MIXED
}
@Metadata.allowExtensions: true
define root view entity ZCDS_DD_ZCONCE_35 as select from zconce_35
{
    key id_conce as IdConce,
    nombre as Nombre,
    localidad as Localidad,
    provincia as Provincia,
    cod_postal as CodPostal,
    telefono as Telefono,
    email as Email
}

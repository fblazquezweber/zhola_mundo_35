CLASS zcl_cliente_35 DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_cliente_35 IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.
  DATA: lt_zcliente_35  type table of zcliente_35,
        ls_zcliente_35 type zcliente_35.

        ls_zcliente_35-id_client = 7.
        ls_zcliente_35-nombre = 'Javier'.
        ls_zcliente_35-apellido = 'Garcia'.
        ls_zcliente_35-id_conce_clt = 15.
        ls_zcliente_35-subscripcion = 'C'.
        ls_zcliente_35-fech_alta ='20240318'.
        ls_zcliente_35-fech_baja = '20250222'.
        ls_zcliente_35-email = 'javigarcia@gmail.com'.

        INSERT zcliente_35 from @ls_zcliente_35.

        if sy-subrc eq 0.
         out->write('Se ha insertado un registro en la tabla ZCONCE_35').
        ENDIF.
  ENDMETHOD.
ENDCLASS.

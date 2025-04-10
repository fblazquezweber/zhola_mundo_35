CLASS zcl_cliente_v2_35 DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_cliente_v2_35 IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.
    DATA: lt_zcliente_35 TYPE TABLE OF zcliente_35,
          ls_zcliente_35 TYPE zcliente_35.

    ls_zcliente_35-id_client = 2.
    ls_zcliente_35-nombre = 'Pedro'.
    ls_zcliente_35-apellido = 'Perez'.
    ls_zcliente_35-id_conce_clt = 7.
    ls_zcliente_35-subscripcion = 'C'.
    ls_zcliente_35-fech_alta ='20240222'.
    ls_zcliente_35-fech_baja = '20250120'.
    ls_zcliente_35-email = 'perezpedro@gmail.com'.

    INSERT zcliente_V2_35 FROM @ls_zcliente_35.

    IF sy-subrc EQ 0.
      out->write('Se ha insertado un registro en la tabla ZCONCE_35').
    ENDIF.

  ENDMETHOD.
ENDCLASS.

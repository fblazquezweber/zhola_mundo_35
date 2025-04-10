CLASS zcl_coche_cliente_35 DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_coche_cliente_35 IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.
  DATA: lt_zcoche_35  type table of zcoche_35,
        ls_zcoche_35 type zcoche_35.

  ls_zcoche_35-id_coche = 4.
  ls_zcoche_35-id_cliente_coch = 9.
  ls_zcoche_35-marca = 'AUDI'.
  ls_zcoche_35-modelo = 'A1'.
  ls_zcoche_35-fech_matric = '20240205'.
  ls_zcoche_35-bastidor = '02187564888'.



        INSERT zcoche_35 from @ls_zcoche_35.

        if sy-subrc eq 0.
         out->write('Se ha insertado un registro en la tabla ZCONCE_35').
        ENDIF.
  ENDMETHOD.
ENDCLASS.

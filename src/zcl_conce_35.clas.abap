CLASS zcl_conce_35 DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_conce_35 IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.
  DATA: lt_zconce_35  type table of zconce_35,
        ls_zconce_35 type zconce_35.

        ls_zconce_35-id_conce = 7.
        ls_zconce_35-nombre = 'BILBAO TRUCKS'.
        ls_zconce_35-localidad = 'Bilbao'.
        ls_zconce_35-provincia = 'Bilbao'.
        ls_zconce_35-cod_postal = '26574'.
        ls_zconce_35-telefono = '913254837'.
        ls_zconce_35-email = 'bilbatrucks@gmail.com'.

        INSERT zconce_35 from @ls_zconce_35.

        if sy-subrc eq 0.
         out->write('Se ha insertado un registro en la tabla ZCONCE_35').
        ENDIF.
  ENDMETHOD.
ENDCLASS.

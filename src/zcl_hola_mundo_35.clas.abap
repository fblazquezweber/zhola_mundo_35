CLASS zcl_hola_mundo_35 DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    INTERFACES if_oo_adt_classrun .
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_hola_mundo_35 IMPLEMENTATION.


  METHOD if_oo_adt_classrun~main.
    out->write( 'Hola Mundo 35' ).
  ENDMETHOD.
ENDCLASS.

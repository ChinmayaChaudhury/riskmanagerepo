using my.bookshop as my from '../db/data-model';

service CatalogService {
    @readonly entity Books as projection on my.Books {
      *,
      null as newtitle: String
    };

// BusinessPartner
     @readonly entity BusinessPartners as projection on my.BusinessPartners;




}

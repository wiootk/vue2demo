import Vue from 'vue'
Vue.filter( 'discount' , function(value,discount) {
        return value  * ( discount / 100 ) ;
  });

 // read: function (value) {
 //    return '$' + value.toFixed(2)
 //  },
 //  write: function (value) {
 //    var number = +value.replace(/[^\d.]/g, '')
 //    return isNaN(number) ? 0 : number
 //  }

 
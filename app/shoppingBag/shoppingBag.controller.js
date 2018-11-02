/**
 * Created by Abhishek on 22/05/2016.
 */
app.controller('cartCtrl', function(cartService, $log) {
  this.items = [];
  this.discount = 0;
  this.totalPrice = 0;

  var cart= this;
  var images=['./content/Images/T1_1.jpg','./content/Images/T2_2.jpg','./content/Images/T3_3.jpg','./content/Images/T4_4.jpg']

  function init(){
    cart.showLoader = true;  
    cartService.getResponse().then(
        function (response) {
          cart.showLoader = false;
          cart.items = response.productsInCart;
                if (cart.items.length) {
                    var i = 0;
                    angular.forEach(cart.items, function (item) {
                        item.imageSrc = images[i];
                        i++;
                    });
                }
                cart.calculateTotal();
            },
            function (e) {
              console.log("Response from service failed to load "+ e);
            });
  }

  cart.calculateTotal = function() {
        if (cart.items.length) {
            cart.totalPrice=0;
            angular.forEach(cart.items, function(item) {
            cart.totalPrice = cart.totalPrice + (item.p_price * item.p_quantity);
          })
        }
      cart.calculateDiscount();
  }
  

  cart.calculateDiscount = function() {
      var totalItems = cart.items.length;
      if (cart.items.length && cart.items.length >2) {
          if (totalItems == 3)
              cart.discount = Math.round((5 * cart.totalPrice) / 100);
          else if (totalItems > 3 && totalItems <10)
            cart.discount = Math.round((10 * cart.totalPrice) / 100);
          else {
              cart.discount = Math.round((25 * cart.totalPrice) / 100);
          }
    }
      else
          cart.discount=0;
  }

  cart.remove=function(itemIndex){
      var itemTotal=cart.items[itemIndex].p_price * cart.items[itemIndex].p_quantity;
      cart.items.splice(itemIndex,1);
      //cart.calculateTotal();
      cart.totalPrice=cart.totalPrice-itemTotal;
      cart.calculateDiscount();
  }

  init();
});
app.directive('prodDescription',function(){
    return {
        restrict: 'E',
        scope: {
            product:'=item',
            index:'@',
            calculate:'&',
            remove:'&'
        },
        controller: function () {
          var selectedColor = "";
          this.selectedSize = this.product.p_selected_size.code;
          this.selectedQty = this.product.p_quantity;
          this.saveColor = function(colorParam){
              selectedColor = colorParam.name;
         }
          this.save = function(){
              this.product.p_selected_size.code = this.selectedSize;
              this.product.p_quantity = this.selectedQty;
              if(selectedColor){
                  this.product.p_selected_color.name = selectedColor;
              }
          }
      },
      bindToController:true,
      replace:true,
      controllerAs:'cartModal',
      templateUrl:'app/prodDescription/prodDescription.directive.html'
  };
});
class WishProductsController < ApplicationController
  include Exceptions

  def new
    @wish_product = WishProduct.new
    authorize @wish_product
  end

  def create
    debugger
    @pending_wish_product = current_user.wish_products.create!(wish_product_params.merge(status: 'pending') )
    authorize @pending_wish_product

  end

  private

  def wish_product_params
    params.require(:wish_product).permit(:name, :image, :description)
  end
end

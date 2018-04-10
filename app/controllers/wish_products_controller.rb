class WishProductsController < ApplicationController
  include Exceptions

  def new
    @wish_product = WishProduct.new
    authorize @wish_product
  end

  def create

  end
end

class WishProductsController < ApplicationController
  include Exceptions

  def index
    authorize WishProduct
    @wish_products = current_user.wish_products
  end

  def new
    @wish_product = WishProduct.new
    authorize @wish_product
  end

  def create
    @pending_wish_product = current_user.wish_products.new(wish_product_params.merge(status: 'pending') )
    authorize @pending_wish_product
    if @pending_wish_product.save!
      flash[:notice] = I18n.t('wish_product.notice.create_success')
    else
      flash[:error] = I18n.t('wish_product.error.create_failure')
    end
    redirect_to wish_products_index_path
  end

  private

  def wish_product_params
    params.require(:wish_product).permit(:name, :image, :description)
  end
end

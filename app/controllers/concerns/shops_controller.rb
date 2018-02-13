class ItemsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index_public, show]

  def index_public
    Item.all
  end

  def index
    current_user.shop.items.order(updated_at: :desc)   if current_user.shop.present?
  end

  def new

  end
end

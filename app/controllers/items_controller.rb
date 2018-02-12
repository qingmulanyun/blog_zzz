class ItemsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index_public]

  def index_public
    Item.all
  end

  def index
    current_user.shop.items.order(updated_at: :desc)
  end
end

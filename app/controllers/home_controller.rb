class HomeController < ApplicationController
  skip_before_action :authenticate_user!
  skip_after_action :verify_authorized , only: [:show]

  def show
  end

  def home_page_info
    @all_items = Item.includes(shop: [:user]).all
    @all_ads = Advertisement.all
    authorize Item
    render 'home_page_info.json'
  end
end

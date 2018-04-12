class WishProductPolicy < ApplicationPolicy

  def index?
    true
  end

  def new?
    user.wish_products.count < 2
  end

  def create?
    new?
  end
end

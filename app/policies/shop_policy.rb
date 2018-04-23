class ShopPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def show?
    record.user_id == user.id
  end

  def my_shop?
    show?
  end

  def new?
    user.present?
  end

  def create?
    user.present?
  end

  def own_shop?
    record.user_id = user.id
  end

  def shop_report?
    true
  end

  def sale_report?
    true
  end

  def approved_wish_products_index?
    record.user_id = user.id
  end
end


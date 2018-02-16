class ItemPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def all_items?
    true
  end

  def show?
    true
  end

  def seller_items?
    true
  end

  def create_seller_item?
    true
  end

  def show_item?
    show?
  end

  def destroy_items?
    record.each do |item|
      return false if item.shop.user_id != user.id
    end
    return true
  end
end

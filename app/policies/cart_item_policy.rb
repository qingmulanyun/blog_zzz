class CartItemPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def destroy_item?
    record.each do |cart_item|
      return false if cart_item.cart.user_id != user.id
    end
    return true
  end

  def update_item?
    record.cart.user_id == user.id
  end

  def create?
    record.each do |cart_item|
      return false if cart_item.cart.user_id != user.id
    end
    return true
  end
end

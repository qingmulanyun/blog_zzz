class OrderPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def create?
    true
  end

  def index?
    true
  end

  def buyer_orders?
    record.each do |order|
      return false if order.buyer_id != user.id
    end
    return true
  end

  def cancel?
    record.buyer_id == user.id
  end

  def admin_index?
    user.shop.present?
  end
end

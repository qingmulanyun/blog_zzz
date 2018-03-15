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

  def seller_orders?
    record.each do |order|
      return false if order.shop_id != user.shop.id
    end
    return true
  end

  def cancel?
    record.buyer_id == user.id
  end

  def update?
    record.shop_id == user.shop.id
  end

  def update_delivery_track_number?
    update?
  end

  def admin_index?
    user.shop.present?
  end
  
  def delivery_tracking?
    record.buyer_id = user.id || record.shop_id = user.shop.id
  end
end

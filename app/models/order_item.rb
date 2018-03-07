class OrderItem < ActiveRecord::Base

  belongs_to :order
  belongs_to :item

  FOREX = 5.3.freeze


  def name
    item.name
  end
  def formatted_price
    (price * FOREX).round(2)
  end

  def formatted_commission
    commission/100
  end

  def formatted_transport_cost
    (transport_cost * FOREX).round(2)
  end

  def formatted_sale_price
    (sale_price * FOREX).round(2)
  end

  def formatted_original_price
    (original_price * FOREX).round(2)
  end
end

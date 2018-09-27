class OrderItem < ActiveRecord::Base

  belongs_to :order
  belongs_to :item
  
  monetize :price_cents, with_model_currency: :price_currency
  monetize :transport_cost_cents, with_model_currency: :transport_cost_currency
  
  FOREX = "CNY".freeze
 

  def name
    item.name
  end
  def formatted_price
    price.exchange_to(FOREX).to_f
  end

  def formatted_commission
    commission/100
  end

  def formatted_transport_cost
    transport_cost.exchange_to(FOREX).to_f
  end
end

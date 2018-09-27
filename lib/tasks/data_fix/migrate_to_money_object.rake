namespace :data_fix do
  desc 'Migrate money related cols to money object'
  task migrate_to_money_object: :environment do
	  Item.all.find_each do |item|
		  item.update_columns(price_cents: item.price_legacy * 100)
      item.update_columns(original_price_cents: item.original_price_legacy * 100)
      item.update_columns(transport_cost_cents: item.transport_cost_legacy * 100)
      item.update_columns(sale_price_cents: item.sale_price_legacy * 100)
	  end
	  
	  Order.all.find_each do |order|
      order.update_columns(sold_price_cents: (order.sold_price_legacy||0) * 100)
	  end
	  
	  OrderItem.find_each do |order_item|
      order_item.update_columns(price_cents: order_item.price_legacy * 100)
      order_item.update_columns(transport_cost_cents: order_item.transport_cost_legacy * 100)
	  end
  end
end

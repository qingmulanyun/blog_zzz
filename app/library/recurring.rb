module Recurring
	class AutoConfirmDelivered
		include Delayed::RecurringJob
		run_every 1.day
		run_at '00:00am'
		timezone 'Sydney'
		# queue 'slow-jobs'
		
		def perform
			Order.sent_orders.each do |order|
				order.delivered if (order.sent_at + 20).to_date >= DateTime.now.to_date
			end
		end
	end
end
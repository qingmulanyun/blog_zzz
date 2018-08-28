namespace :recurring do
	task init: :environment do
		Recurring::AutoConfirmDelivered.schedule! if Rails.env.production?
	end
end
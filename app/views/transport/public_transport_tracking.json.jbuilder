json.array! @feed.entity do |entity|
  json.vehicle do
    json.id entity.vehicle.vehicle.id
    json.label entity.vehicle.vehicle.label
  end

  json.vehicle_id entity.vehicle.vehicle.id
  json.vehicle_label entity.vehicle.vehicle.label

  json.location do
    json.lat entity.vehicle.position.latitude
    json.lng entity.vehicle.position.longitude
  end
end


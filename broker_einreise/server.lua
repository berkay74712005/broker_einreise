RegisterNetEvent('broker_einreise:CheckStatus')
AddEventHandler('broker_einreise:CheckStatus', function()
    license  = false
    local _source = source
    for k,v in pairs(GetPlayerIdentifiers(_source))do
        if string.sub(v, 1, string.len("license:")) == "license:" then
            license = v
        end
    end

    ped = GetPlayerPed(source)
    local player = license:gsub("%license:", "")
    Wait(50)
    MySQL.query('SELECT einreise FROM users WHERE identifier = @identifier', {['@identifier'] = player}, function(result)
        local einreise_status = result[1].einreise
        local einreise_status = tonumber(einreise_status)
        if einreise_status == 0 then
           -- print('muss noch einreise machen')
            TriggerClientEvent('broker_einreise:StartQuiz', _source)
        elseif einreise_status == 1 then
           -- print('hat einreise gemacht')
        end
    end)
end)

RegisterNetEvent('broker_einreise:ChangeStatus')
AddEventHandler('broker_einreise:ChangeStatus', function(status)
    local _source = source
    if status == 1 then
        license  = false
        print('success')

        for k,v in pairs(GetPlayerIdentifiers(_source))do
            if string.sub(v, 1, string.len("license:")) == "license:" then
                license = v
            end
        end

        local player = license:gsub("%license:", "")
        Wait(50)
        MySQL.update('UPDATE users SET einreise = @einreise WHERE identifier = @identifier',
        {
            ['@einreise'] = '1',
            ['@identifier'] = player
        })
    elseif status == 'Fail' then
        --print('failed')
        Wait(500)
        DropPlayer(_source, 'Go and read the rules again')
    else
        DropPlayer(_source, 'Dont try to hack yourself in')
    end
end)
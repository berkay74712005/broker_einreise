AddEventHandler('playerSpawned', function()
	TriggerServerEvent('broker_einreise:CheckStatus')
end)

function StartQuiz()
    SetNuiFocus(true, true)
	SendNUIMessage({
		action = 'OpenQuiz'
	})
end

RegisterNetEvent('broker_einreise:StartQuiz')
AddEventHandler('broker_einreise:StartQuiz', function()
    --print('einreise wird gemacht')
    StartQuiz()
end)

RegisterNUICallback('QuizSuccess', function(data, cb)
	TriggerServerEvent('broker_einreise:ChangeStatus', data.status)
	SetNuiFocus(false, false)
	cb('ok')
end)
var apiURL = 'http://userprofile.cloudfoundry.com/user/';
var personalNumber = "";
var firstName = "";
var lastName = "";
var level = "";
var ceLevel = "";
var skills = "";
var email = "";
function saveProfile()
{
	personalNumber = $("#personalNumber").val();
	firstName = $("#firstName").val();
	lastName = $("#lastName").val();
	level = $("#level").val();
	ceLevel = $("#ceLevel").val();
	skills = $("#skills").val();
	email = $("#email").val();
	$.ajax({
				url: apiURL + "saveUserProfile",
				type: 'post',
				dataType: 'json',
				data: JSON.stringify({personalNumber:personalNumber, firstName:firstName, lastName:lastName, level:level, ceLevel:ceLevel, skills:skills, email:email}),
				contentType: 'application/json',
				success: function (data)
				{
					if( data.success === true )
					{
						showConfirmationDialog(
							'Oops!',
							'<p>' + message + '</p>',
							'Ok'
						);
					}
					else
					{
						displayError( data.message );
					}
				},
				error:function(data, text, xhr)
				{
					onError(data, text, xhr);
				}
			});
}

function loadProfile(data, textStatus, jqXHR)
{
	if( data.success === true )
	{
		$("#personalNumber").val(data.personalNumber);
		$("#firstName").val(data.firstName);
		$("#lastName").val(data.lastName);
		$("#level").val(data.level);
		$("#ceLevel").val(data.ceLevel);
		$("#skills").val(data.skills);
		$("#email").val(data.email);
	}
	else
	{
		displayError( data.message );
	}
}
function getUserProfileByPN()
{
	personalNumber = $("#personalNumber").val();
	$.ajax({
			url: apiURL + "getUserProfileByPN",
			type: 'post',
			dataType: 'json',
			data: JSON.stringify({personalNumber:personalNumber}),
			contentType: 'application/json',
			success: function (data)
			{
				if( data.success === true )
				{
					$("#personalNumber").val(data.personalNumber);
					$("#firstName").val(data.firstName);
					$("#lastName").val(data.lastName);
					$("#level").val(data.level);
					$("#ceLevel").val(data.ceLevel);
					$("#skills").val(data.skills);
					$("#email").val(data.email);
				}
				else
				{
					displayError( data.message );
				}
			},
			error:function(data, text, xhr)
			{
				onError(data, text, xhr);
			}
		});
}

function displayError( message )
{
	message = ( message ) ? message : 'Unknown error!';
	
	showConfirmationDialog(
		'Oops!',
		'<p>' + message + '</p>',
		'Ok'
	);
}

function onError(data, text, xhr)
{
	displayError( 'Error ' + data.status );
}

function showConfirmationDialog( title, content, okText, okFnc, okFncArgs, cancelText, cancelFnc, cancelFncArgs )
{
	$('#displayMessage').html(content);
}



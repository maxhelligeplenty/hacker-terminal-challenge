var terminal = document.getElementById('container');
var cmdLine = document.getElementById('input-line');
var errorMessage = 'command not found';
var waitingForEnter = false;
var consoleOtp = document.getElementsByClassName("consoleOtp")[0];
var randomIp = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0);
var consolePrompt = '[' + randomIp + '] >';

$(function() {
  var input = document.getElementsByClassName("cmdline")[0];
  $('.prompt').html(consolePrompt);
	input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
      	consoleOtp.innerHTML += consolePrompt + ' ' + input.value;
      	executeCommand(input.value);
        input.value = '';
    }
  });
});

function executeCommand(value)
{
	switch(value)
	{
		case 'list':
		showAllCommands();
		break;
		case 'clear':
		clearTerminal();
		break;
		case 'connect':
		connect();
		break;
		case 'engage':
		runMatrixAnimation();
		break;
		case 'exit':
		exitTerminal();
		break;
		default:
		showErrorMessage(value);
	}
}

function showErrorMessage(value)
{
	consoleOtp.innerHTML += '<div>-bash: ' + value + ': ' + errorMessage + '<br></div>';
}

function showAllCommands()
{
	consoleOtp.innerHTML += '<div>Commands:<br>list<br>engage<br>connect<br>clear<br>exit<br></div>';
}

function clearTerminal()
{
	consoleOtp.innerHTML = '';
}
 
function exitTerminal()
{
	$( "#input-line" ).remove();
	consoleOtp.innerHTML += '<div>Exit Terminal<br>End of Process...</div>';
	setTimeout(function() {
    	location.reload();
    }, 3000);
}

function connect()
{
	connectToServer();
}

function connectToServer()
{
	var i = 0;
	var width = 0;
	var connectingMessages = [
		'> connecting to remote server...',
		'> enter username and password',
		'> logging in',
		'> getting root permissions',
		'> start data transfer',
		'> connected to server'
	];
	consoleOtp.innerHTML += '<div id="progressBar"></div>';
	consoleOtp.innerHTML += '<br><div>' + connectingMessages[i] + '</div>';
	hideCmdInput();
	var id = setInterval(frame, 100);
	function frame()
	{
		if(width >= 100)
		{
			document.getElementById('progressBar').classList.add('progressBar');
			document.getElementById('progressBar').removeAttribute('id');
			showCmdInputAndSetAutofocus();
			clearInterval(id);
		}
		else
		{
			width++;
			document.getElementById('progressBar').style.width = 500 / 100 * width + 'px';
			document.getElementById('progressBar').innerHTML = width*1 + '%';
			if(width % 20 === 0)
			{
				i++;
				consoleOtp.innerHTML += '<div>' + connectingMessages[i] + '</div>';
			}
		}
	}
}

function runMatrixAnimation()
{
  var container = document.createElement('canvas');
  container.classList.add('matrix-effect');
  terminal.appendChild(container);
  var c = document.getElementsByClassName("matrix-effect")[0];
  var ctx = c.getContext("2d");
  c.height = 300;
  c.width = terminal.clientWidth;
  var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
  chinese = chinese.split("");
  var font_size = 10;
  var columns = c.width / font_size;
  var drops = [];
  for (var x = 0; x < columns; x++)
    drops[x] = 1;
  setInterval(function(){ 
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#0F0";
    ctx.font = font_size + "px arial";
    for(var i = 0; i < drops.length; i++)
    {
      var text = chinese[Math.floor(Math.random()*chinese.length)];
      ctx.fillText(text, i*font_size, drops[i]*font_size);
      if(drops[i]*font_size > c.height && Math.random() > 0.975)
        drops[i] = 0;
      drops[i]++;
    }
  }, 33);
  clearTerminal();
  appear();
}

function appear()
{
     cmdLine.setAttribute('style', 'display:none;');
     waitingForEnter = true;
}

function keydownHandler(e) {
    if (e.keyCode == 13 && waitingForEnter) {  
        cmdLine.setAttribute('style', 'display:flex;');
        $( '.matrix-effect' ).remove();
        setTimeout(function() {
        	document.getElementsByClassName("cmdline")[0].focus();
        }, 100);
        waitingForEnter = false; 
    }
}

function hideCmdInput()
{
	cmdLine.setAttribute('style', 'display:none;');
}
function showCmdInputAndSetAutofocus()
{
	cmdLine.setAttribute('style', 'display:flex;');	
	setTimeout(function() 
	{
       	document.getElementsByClassName("cmdline")[0].focus();
    }, 200);
}

if (document.addEventListener) {
    document.addEventListener('keypress', keydownHandler, false);
}
else if (document.attachEvent) {
    document.attachEvent('onkeydown', keydownHandler);
}

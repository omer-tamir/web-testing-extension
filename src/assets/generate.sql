SELECT  
last_name as 'useCase' ,
JSON_QUERY((
SELECT  AS param 
FROM Article WHERE Hash=a.Hash)) as loginParams 
from Article  a
where last_name in ('Walshaw','McGachey')
FOR JSON PATH,Root('applicationLogin') 

SELECT '['+STRING_AGG (
'{"inputType": "Id",'
+'"controllerNameOrId": "LoginViewModel_Surname",'
+'"controllerValue":"'+last_name
+'"},'
+'{"inputType": "Id",'
+'"controllerNameOrId": "LoginViewModel_DateOfBirth_Day",'
+'"controllerValue":"'+CAST(DAY(DateOfBirth) AS varchar)
+'"},'
+'{"inputType": "Id",'
+'"controllerNameOrId": "LoginViewModel_DateOfBirth_Month",'
+'"controllerValue":"'+CAST(Month(DateOfBirth) AS varchar)
+'"},'
+'{"inputType": "Id",'
+'"controllerNameOrId": "LoginViewModel_DateOfBirth_Year",'
+'"controllerValue":"'+CAST(YEAR(DateOfBirth) AS varchar)
+'"},'
+'{"inputType": "UrlFregment",'
+'"controllerNameOrId": "f",'
+'"controllerValue":"'+Hash
+'"}'
, ',')+']' AS param 
FROM Article
where last_name in ('Walshaw')
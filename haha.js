


server {
    listen       9989;
    server_name  localhost;
    root /home/xiaoju/soda-b/dist;
    access_log  logs/localhost.access.log  main;

    location /  {
        try_files $uri $uri/ /index.html;
    expires 0;
    }
}


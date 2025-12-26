FROM tomcat:9-jdk17
LABEL maintainer="dhee31"
RUN rm -rf /usr/local/tomcat/webapps/ROOT
COPY target/tradingview.war /usr/local/tomcat/webapps/ROOT.war
EXPOSE 8084
CMD ["catalina.sh", "run"]

    

library('RMySQL', warn.conflicts = FALSE)
library('visNetwork', warn.conflicts = FALSE)
library('igraph', warn.conflicts = FALSE)

con <- dbConnect(MySQL(), 
                 db = "homestead",
                 username = "root", 
                 password = "sightseeing",
                 host = "140.136.155.116")
dbSendQuery(con,"SET NAMES big5")

args <- commandArgs(TRUE)
sid <- args
# sid <- 'S0102'
node_sql <- paste("SELECT * FROM segment_data WHERE site_id = '",sid,"'AND evaluation = 'N'", sep="")
node_sql
relationship_sql <- paste("SELECT from_id,to_id,weight,color FROM `segment_relationship` SR WHERE site_id = '",sid,"' AND SR.from_id = ANY(SELECT id FROM segment_data WHERE site_id = '",sid,"' AND evaluation = 'N')", sep="")
relationship_sql
segment <- dbGetQuery(con, node_sql)
relationship <- dbGetQuery(con, relationship_sql)
x <- data.frame(segment)
y <- data.frame(relationship)
x
y
nodes <- data.frame(id = c(x$id), label = c(x$segment), color = c(x$color), 
                    # title = paste("<p>", x$segment,"</p>"),
                    font.size = 30, value = c(x$weight))
edges <- data.frame(from = c(y$from_id), to = c(y$to_id),value = c(y$weight),color = c(y$color))

ccout <- visNetwork(nodes,edges, width = "100%",height = "500px") %>%
  visIgraphLayout()

visSave(ccout, file = "C://xampp/htdocs/SNA_sean/exam58/quasarapp/src/statics/bad.html",selfcontained = TRUE, background = "white")
from neo4j import GraphDatabase

# ------ Credentials ----------
uri = "bolt://localhost:7687"
userName = "neo4j"
password = "sai"

#------- Connect to database -------
graphDB_Driver = GraphDatabase.driver(uri, auth=(userName, password))

def list_nodes():
    '''function to list all nodes'''
    with graphDB_Driver.session() as graphDB_Session:
        cqlNodeQuery = "MATCH (x:Node) RETURN x"

        nodes = graphDB_Session.run(cqlNodeQuery)
        results = [record for record in nodes.data()]
        nodeList = [list(node.values())[0] for node in results]
        
        
        return {'nodes':nodeList}
        

def list_relationships():
    with graphDB_Driver.session() as graphDB_Session:
        cqlNodeQuery = "MATCH (x:Node)-[r:follows]-(y:Node) RETURN x.name,y.name"
        all_rel = graphDB_Session.run(cqlNodeQuery)
        all_list = []

        for record in all_rel:
            small_list = [
                record[0],
                record[1],
                record[2],
                record[3],
                record[4],
                record[5],
            ]
            all_list.append(small_list)
        sall_list = sorted(all_list)
        return sall_list

def add_connection(node1, node2):
    isExists = False 
    with graphDB_Driver.session() as graphDB_Session:
        
        cqlTestQuery = (
            '''match (m:Node{name:"'''
            + str(node1['name'])
            + '''"}),(n:Node{name:"'''
            + str(node2['name'])
            + """"})
        return exists((m)-[:follows]-(n))"""
        )
        test = graphDB_Session.run(cqlTestQuery)
        ans = [record[0] for record in test][0]
        print("\n\n",ans,"\n\n")
        if ans:
            isExists = True
        else:
            cqlRelQuery = (
                '''match (m:Node),(n:Node) where m.name="'''
                + str(node1['name'])
                + '''" and n.name="'''
                + str(node2['name'])
                + '''"
            create (m)-[r:follows]->(n)''' 
            )
            updateFollowers = ('''match (m:Node) where m.name="'''
                + str(node1['name'])
                + '''" OR m.name= "'''+str(node2['name'])+'''"
                SET m.followers=m.followers+1''')
            graphDB_Session.run(cqlRelQuery)
            graphDB_Session.run(updateFollowers)
    
    return isExists
def add_connection1(node1,node2):
    with graphDB_Driver.session() as graphDB_Session:
        cqlNodeQuery = '''MATCH (x:Node) where x.name="'''+str(node1['name'])+'''" RETURN x'''

        nodes = graphDB_Session.run(cqlNodeQuery)
        results = [record for record in nodes.data()]
        nodeList = [list(node.values())[0] for node in results]
        print(nodeList)
        
        return {'nodes':nodeList}

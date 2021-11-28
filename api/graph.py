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
        cqlNodeQuery = "MATCH (x:Node)-[r:follows]->(y:Node) RETURN x.name,y.name"
        all_rel = graphDB_Session.run(cqlNodeQuery)
        all_list = []

        for record in all_rel:
            #print(record)
            small_list = [record[0],record[1]]
            #print(small_list)
            
            all_list.append(small_list)
        #print(all_list)
        return all_list

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
def del_connection(node1,node2):
    isExists = True
    with graphDB_Driver.session() as graphDB_Session:
        cqlTestQuery = (
            '''match (m:Node{name:"'''
            + node1['name']
            + '''"}),(n:Node{name:"'''
            + node2['name']
            + """"})
        return exists((m)-[:follows]-(n))"""
        )
        test = graphDB_Session.run(cqlTestQuery)
        ans = [record[0] for record in test][0]
        
        if ans:
            cqlNodeQuery = ('''MATCH (n:Node {name:"'''+node1['name']+'''"})-[r:follows]-(m:Node {name:"'''+node2['name']+'''"}) DELETE r ''')
            graphDB_Session.run(cqlNodeQuery)
        else:
            isExists = False
    return isExists

def add_node(node):
    isExists = False
    with graphDB_Driver.session() as graphDB_Session:
        cqlSearchQuery = ('match (m:Node{name:"'+node['name']+'"}) return m')
        test = graphDB_Session.run(cqlSearchQuery)
        ans = [record for record in test]
        print(ans)
        if(ans != []):
            return True
        cqlNodeQuery = (
            'create (n:Node{name:"' + node['name'] + '",age:' + str(node['age']) + ',followers:'+str(node['followers'])+'})'
        )
        graphDB_Session.run(cqlNodeQuery)
    return isExists

def del_node(node):
    with graphDB_Driver.session() as graphDB_Session:
        cqlNodeQuery = (
            '''match (n:Node)-[r:follows]-(m:Node) where n.name="'''+node['name']+'''" set m.followers=m.followers-1'''
        )
        
        cqldelQuery = (
            '''Match (n:Node) where n.name = "'''
            + node['name']
            + '''" detach delete n'''
        )
        graphDB_Session.run(cqlNodeQuery)
        graphDB_Session.run(cqldelQuery)
    return
list_relationships()
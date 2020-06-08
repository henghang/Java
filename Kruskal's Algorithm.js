import java.util.*;

public class MyClass {
    public static void main(String args[]) {
        int inf = Integer.MAX_VALUE;
        int[][] adjMatrix = new int[][] {
            {0, 7, inf, 4, inf, inf},
            {7, 0, 5, 9, inf, inf},
            {inf, 5, 0, 7, 13, inf},
            {4, inf, 7, 0, 10, inf},
            {inf, inf, 13, 10, 0, 11},
            {inf, inf, inf, inf, 11, 0}
        };
        
        ArrayList<Edge> allEdges = new ArrayList<>();
        
        int parent[] = new int[adjMatrix.length];
        Arrays.fill(parent, -1);
        for (int i = 0; i < adjMatrix.length; i++) {
            for (int j = 0; j < adjMatrix.length; j++) {
                if (!(i == j) && j > i && !(adjMatrix[i][j] == inf)) {
                    allEdges.add(new Edge(i, j, adjMatrix[i][j]));
                }
            }
        }
        Collections.sort(allEdges);
        int mstWeight = 0;
        int numberOfEdges = 0;
        for (Edge e: allEdges) {
            if (numberOfEdges == adjMatrix.length - 1) {
                break;
            }
            int startSet = Edge.find(e.start, parent);
            int endSet = Edge.find(e.end, parent);
            if (!(startSet == endSet)) {
                parent[Math.min(startSet, endSet)] = Math.max(startSet, endSet);
                mstWeight += e.weight;
                System.out.println("Edges: (" + e.start + ") --> (" + e.end + ")");
            }
        }
        System.out.println("Weight: " + mstWeight);
    }
}

class Edge implements Comparable<Edge>{
    int start;
    int end;
    int weight;
    
    public Edge(int start, int end, int weight) {
        this.start = start;
        this.end = end;
        this.weight = weight;
    }
    
    public int compareTo(Edge edge) {
        return this.weight - edge.weight;
    }
    
    public static int find(int node, int[] parent) {
        if (parent[node] == -1) {
            return node;
        }
        return find(parent[node], parent);
    }
}
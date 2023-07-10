class BrinItem {
    constructor(next, node) {
        this.next = next;
        this.node = node;
    }
}

class Brin {
    constructor(size, order) {
        this.size = size;
        this.order = order;

        this.bi = 0;
        this.nodesLn = 0;

        this.nodes = new Array(order);
        this.starts = {};
        this.brins = new Array(order * 2);
        this.last = {};
    }

    addEdge(source, target) {
        //console.log(neighbor)

        var si = source;
        var ni = target;

        // Initialisation du brin
        this.brins[this.bi] = new BrinItem(
            undefined, // Next brin
            source, // Out node id
        );

        this.brins[this.bi + 1] = new BrinItem(
            undefined, // Next brin
            target,
        );

        // Cas du brin pair
        // Mise à jour start et next
        if (this.starts[si] === undefined) {
            this.starts[si] = this.bi;
            this.nodes.push(source);
        } else {
            var lbi = this.last[si];
            this.brins[lbi].next = this.bi;
        }
        // Mise à jour last and next
        this.last[si] = this.bi;
        this.brins[this.bi].next = this.starts[si];

        // Cas du brin impair
        // Mise à jour start et next
        if (this.starts[ni] === undefined) {
            this.starts[ni] = this.bi + 1;
            this.nodes.push(source);
        } else {
            var lbi = this.last[ni];
            this.brins[lbi].next = this.bi + 1;
        }
        // Mise à jour last and next
        this.last[ni] = this.bi + 1;
        this.brins[this.bi + 1].next = this.starts[ni];

        this.bi += 2;
    }

    hasEdge(source, target) {
        var sbi = this.starts[source];
        var rbi = this.brins[sbi].next;
        while (true) {
            var nbrin = this.brins[rbi];
            if (rbi % 2 == 0) {
                var obrin = this.brins[rbi + 1];
                if (obrin.node == target) return true;
            }

            if (sbi === rbi) break;
            rbi = nbrin.next;
        }
        return false;
    }

    neighborsList() {
        var neighbors = {}

        this.nodes.forEach(node => {
            // Init
            var sbi = this.starts[node];
            neighbors[node] = []

            // Looping
            var rbi = this.brins[sbi].next;
            while (true) {
                var nbrin = this.brins[rbi];
                if (rbi % 2 == 0) {
                    var obrin = this.brins[rbi + 1];
                    neighbors[node].push(obrin.node);
                }

                if (sbi === rbi) break;
                rbi = nbrin.next;
            }
        });

        return neighbors;
    }

}

export default Brin;
